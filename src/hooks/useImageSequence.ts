'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  PALM_SEQUENCE,
  TOTAL_FRAMES,
  getVariantProfile,
  type SequenceVariant,
} from '@/config/palmSequence';

/** Anything `drawImage` accepts. ImageBitmap is preferred (GPU-resident). */
export type Drawable = ImageBitmap | HTMLImageElement;

export type SequenceStatus = 'loading' | 'streaming' | 'complete' | 'error';

export interface SequenceState {
  status: SequenceStatus;
  /** 0 → 1 across the whole set. */
  progress: number;
  loaded: number;
  total: number;
  failures: number;
  /** True once the first `criticalFrames` are decoded and drawable. */
  criticalReady: boolean;
  variant: SequenceVariant;
}

export interface ImageSequence {
  state: SequenceState;
  /**
   * Decoded frame store, indexed 0…29. Held in a ref on purpose: it changes
   * dozens of times during preload and must never trigger a React render.
   */
  framesRef: RefObject<(Drawable | null)[]>;
  /** Same value as `state.progress` but mutable, for rAF consumers. */
  progressRef: RefObject<number>;
  getFrame: (index: number) => Drawable | null;
}

interface Options {
  variant: SequenceVariant;
  /** Set false to skip preloading entirely (e.g. reduced-motion visitors). */
  enabled?: boolean;
  /** Frames decoded before the loader releases the site. */
  criticalFrames?: number;
  /** Hard ceiling (ms) — the loader exits even on a hostile network. */
  timeout?: number;
}

const initialState = (variant: SequenceVariant): SequenceState => ({
  status: 'loading',
  progress: 0,
  loaded: 0,
  total: TOTAL_FRAMES,
  failures: 0,
  criticalReady: false,
  variant,
});

/** Does the optional portrait frame set exist? One probe, cached per session. */
const variantProbeCache = new Map<string, boolean>();

function probeVariant(url: string): Promise<boolean> {
  const cached = variantProbeCache.get(url);
  if (cached !== undefined) return Promise.resolve(cached);

  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);

    const image = new Image();
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      variantProbeCache.set(url, ok);
      image.src = '';
      resolve(ok);
    };

    // A stalled probe must never hold the hero hostage.
    const timer = window.setTimeout(() => finish(false), 2500);
    image.onload = () => {
      window.clearTimeout(timer);
      finish(true);
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      finish(false);
    };
    image.src = url;
  });
}

export async function detectVariant(preferred: SequenceVariant): Promise<SequenceVariant> {
  if (preferred !== 'mobile') return 'desktop';
  const hasMobile = await probeVariant(PALM_SEQUENCE.mobileFilePattern(PALM_SEQUENCE.firstFrame));
  return hasMobile ? 'mobile' : 'desktop';
}

function urlFor(variant: SequenceVariant, index: number): string {
  return variant === 'mobile'
    ? PALM_SEQUENCE.mobileFilePattern(index + PALM_SEQUENCE.firstFrame)
    : PALM_SEQUENCE.filePattern(index + PALM_SEQUENCE.firstFrame);
}

/**
 * Decode a blob into a drawable, downscaled to `maxWidth` when larger.
 *
 * The two-step decode (full → resized) exists so small sources are never
 * upscaled: `createImageBitmap` cannot know the intrinsic size until the first
 * pass. The oversized original is closed immediately, so peak memory is one
 * frame, not thirty.
 */
async function decodeFrame(blob: Blob, maxWidth: number): Promise<Drawable> {
  if (typeof createImageBitmap === 'function') {
    const full = await createImageBitmap(blob);
    if (full.width <= maxWidth) return full;

    const height = Math.max(1, Math.round((full.height * maxWidth) / full.width));
    try {
      const scaled = await createImageBitmap(blob, {
        resizeWidth: maxWidth,
        resizeHeight: height,
        resizeQuality: 'high',
      });
      full.close();
      return scaled;
    } catch {
      // Some engines reject resize hints; the full bitmap is still usable.
      return full;
    }
  }

  // Legacy path: no createImageBitmap. Decode via <img>, which also gives the
  // browser a chance to hand the pixels to the compositor.
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.decoding = 'async';
    image.src = url;
    if (typeof image.decode === 'function') {
      await image.decode();
    } else {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('decode failed'));
      });
    }
    return image;
  } finally {
    // Keep the object URL alive while the element is in use; release it later.
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }
}

/**
 * Progressive frame preloader.
 *
 *  · fetches with a small worker pool so the first frames win the race
 *  · stores results by index, so out-of-order completion never scrambles order
 *  · reports per-frame progress through a ref (zero re-renders) plus throttled
 *    state for the loader UI
 *  · a missing frame is recorded as a hole; the renderer blends across it
 *  · aborts and closes every bitmap on unmount
 */
export function useImageSequence({
  variant,
  enabled = true,
  criticalFrames = PALM_SEQUENCE.criticalFrames,
  timeout = 9000,
}: Options): ImageSequence {
  const framesRef = useRef<(Drawable | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const progressRef = useRef(0);
  const [state, setState] = useState<SequenceState>(() => initialState(variant));

  useEffect(() => {
    if (!enabled) {
      setState({ ...initialState(variant), status: 'complete', criticalReady: true });
      return;
    }

    const controller = new AbortController();
    const profile = getVariantProfile(variant);
    const owned: Drawable[] = [];
    let cancelled = false;
    let loaded = 0;
    let failures = 0;

    const publish = (status: SequenceStatus, criticalReady: boolean) => {
      if (cancelled) return;
      setState({
        status,
        progress: loaded / TOTAL_FRAMES,
        loaded,
        total: TOTAL_FRAMES,
        failures,
        criticalReady,
        variant,
      });
    };

    setState(initialState(variant));

    const loadOne = async (index: number): Promise<void> => {
      const existing = framesRef.current[index];
      if (existing) {
        loaded += 1;
        return;
      }

      try {
        const response = await fetch(urlFor(variant, index), {
          signal: controller.signal,
          // The first frames are on the critical path for the hero.
          priority: index < criticalFrames ? 'high' : 'low',
          // 'default', not 'force-cache': frames keep the same filenames when
          // they are swapped for the real footage, so revalidation must stay on.
          cache: 'default',
        } as RequestInit);

        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

        const blob = await response.blob();
        const drawable = await decodeFrame(blob, profile.maxTextureWidth);

        if (cancelled) {
          if ('close' in drawable) drawable.close();
          return;
        }

        framesRef.current[index] = drawable;
        owned.push(drawable);
      } catch (error) {
        if (controller.signal.aborted) return;
        failures += 1;
        if (process.env.NODE_ENV !== 'production') {
          // A hole is recoverable; the developer still deserves to hear about it.
          console.warn(
            `[palm-paradise] frame ${index + PALM_SEQUENCE.firstFrame} unavailable (${
              (error as Error).message
            }) — blending across it.`,
          );
        }
      } finally {
        loaded += 1;
        const ratio = loaded / TOTAL_FRAMES;
        progressRef.current = ratio;
        publish(ratio >= 1 ? 'complete' : 'streaming', loaded >= criticalFrames);
      }
    };

    const worker = async (queue: number[]): Promise<void> => {
      while (queue.length > 0 && !cancelled) {
        const index = queue.shift();
        if (index === undefined) return;
        await loadOne(index);
      }
    };

    // Front-loaded queue: frame 1 first, then 2… Sequential arrival means the
    // visitor can start scrolling long before the tail of the set lands.
    const queue = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
    const pool = Array.from(
      { length: Math.min(PALM_SEQUENCE.concurrency, TOTAL_FRAMES) },
      () => worker(queue),
    );

    // Whatever happens, the site becomes interactive.
    const bail = window.setTimeout(() => {
      if (cancelled) return;
      publish('streaming', true);
    }, timeout);

    void Promise.allSettled(pool).then(() => {
      window.clearTimeout(bail);
      publish(failures === TOTAL_FRAMES ? 'error' : 'complete', true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(bail);
      controller.abort();
      // Frames are owned by this effect instance; release GPU memory.
      for (const drawable of owned) {
        if ('close' in drawable) drawable.close();
      }
      framesRef.current = new Array(TOTAL_FRAMES).fill(null);
      progressRef.current = 0;
    };
  }, [variant, enabled, criticalFrames, timeout]);

  const getFrame = useCallback((index: number): Drawable | null => {
    const frames = framesRef.current;
    if (index < 0 || index >= frames.length) return null;
    return frames[index] ?? null;
  }, []);

  return { state, framesRef, progressRef, getFrame };
}
