'use client';

import { useEffect, useRef, type RefObject } from 'react';
import {
  LAST_FRAME_INDEX,
  PALM_SEQUENCE,
  TOTAL_FRAMES,
  getVariantProfile,
  type SequenceVariant,
} from '@/config/palmSequence';
import type { Drawable } from '@/hooks/useImageSequence';
import { drawCover, drawFallbackScene, resolveFrame } from './sequenceUtils';
import { clamp, damp, lerp, setText } from '@/lib/utils';

/**
 * Longest edge of the backing store, in device pixels. A 5K display at dpr 2
 * would otherwise ask for a ~100 megapixel canvas; nothing on screen benefits.
 */
const MAX_BACKING_EDGE = 2600;

export interface SequenceCanvasProps {
  framesRef: RefObject<(Drawable | null)[]>;
  /** Scroll progress, 0 → 1, written by ScrollTrigger outside of React. */
  progressRef: RefObject<number>;
  variant: SequenceVariant;
  /** Optional debug readouts, updated by direct DOM writes. */
  frameRef?: RefObject<HTMLSpanElement | null>;
  percentRef?: RefObject<HTMLSpanElement | null>;
  /** Paint a single static frame and skip the loop (reduced motion). */
  frozen?: boolean;
  className?: string;
}

/**
 * The frame-sequence renderer.
 *
 * Deliberately free of React state: scroll progress arrives through a ref, the
 * current fractional frame lives in a local variable, and the only DOM writes
 * are the canvas bitmap plus two debug spans. Nothing here re-renders React.
 *
 * Continuity comes from three layers stacked on purpose:
 *   1. ScrollTrigger `scrub` — GSAP chases the scrollbar instead of snapping.
 *   2. Frame-rate independent damping — a flick still glides.
 *   3. Fractional blending — between two frames we dissolve, so 30 stills read
 *      as one camera move rather than a flipbook.
 */
export function SequenceCanvas({
  framesRef,
  progressRef,
  variant,
  frameRef,
  percentRef,
  frozen = false,
  className,
}: SequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const profile = getVariantProfile(variant);
    const { focal } = profile;

    let cssWidth = 0;
    let cssHeight = 0;
    let dirty = true;
    let rafId = 0;
    let lastTime = performance.now();
    let displayed = clamp(progressRef.current, 0, 1) * LAST_FRAME_INDEX;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      if (nextWidth === cssWidth && nextHeight === cssHeight) return;

      cssWidth = nextWidth;
      cssHeight = nextHeight;

      const deviceRatio = window.devicePixelRatio || 1;
      let dpr = Math.min(deviceRatio, PALM_SEQUENCE.maxDpr);
      const longest = Math.max(cssWidth, cssHeight);
      if (longest * dpr > MAX_BACKING_EDGE) {
        dpr = Math.max(1, MAX_BACKING_EDGE / longest);
      }

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      dirty = true;
    };

    const paint = (position: number) => {
      const ratio = position / LAST_FRAME_INDEX;
      const scale = lerp(PALM_SEQUENCE.cameraPush.from, PALM_SEQUENCE.cameraPush.to, ratio);
      const frames = framesRef.current;

      const floor = Math.floor(position);
      const blend = position - floor;

      const a = resolveFrame(frames, floor);
      const b = resolveFrame(frames, Math.min(floor + 1, LAST_FRAME_INDEX));

      if (a.frame) {
        drawCover(ctx, a.frame, cssWidth, cssHeight, focal, scale);
      } else {
        drawFallbackScene(ctx, cssWidth, cssHeight, ratio);
      }

      // Dissolve into the next frame. Skipped at the extremes of the blend
      // window, where the second full-screen draw would buy nothing.
      const blendWindow = PALM_SEQUENCE.blendWindow;
      if (b.frame && b.index !== a.index && blend > 0.005 * blendWindow && blend < 0.995) {
        ctx.globalAlpha = clamp(blend / blendWindow, 0, 1);
        drawCover(ctx, b.frame, cssWidth, cssHeight, focal, scale);
        ctx.globalAlpha = 1;
      }

      if (frameRef?.current) setText(frameRef.current, `${floor + 1} / ${TOTAL_FRAMES}`);
      if (percentRef?.current) setText(percentRef.current, `${Math.round(ratio * 100)}%`);
    };

    let lastPainted = Number.NaN;

    const loop = () => {
      rafId = requestAnimationFrame(loop);

      const now = performance.now();
      // Clamp dt so a backgrounded tab does not teleport the sequence.
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (cssWidth === 0 || cssHeight === 0) resize();

      if (!dirty) {
        const target = clamp(progressRef.current, 0, 1) * LAST_FRAME_INDEX;
        displayed = damp(displayed, target, PALM_SEQUENCE.damping, dt);
        if (Math.abs(target - displayed) < 0.004) displayed = target;

        // Skip the two full-screen draws when the frame has not moved enough
        // for anyone to notice. Idle scrolling costs nothing.
        if (Math.abs(displayed - lastPainted) < 0.0012) return;
      }

      dirty = false;
      lastPainted = displayed;
      paint(displayed);
    };

    resize();

    if (frozen) {
      paint(displayed);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(host);

    // Pause the loop while the tab is hidden; resume without a jump.
    const onVisibility = () => {
      if (frozen) return;
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (rafId === 0) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [framesRef, progressRef, variant, frozen, frameRef, percentRef]);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      data-testid="sequence-canvas-host"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        role="presentation"
      />
    </div>
  );
}

export default SequenceCanvas;
