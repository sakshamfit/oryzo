'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  PALM_SEQUENCE,
  SEQUENCE_DEBUG,
  getVariantProfile,
  type SequenceVariant,
} from '@/config/palmSequence';
import { MEDIA } from '@/hooks/useMediaQuery';
import { useImageSequence, detectVariant } from '@/hooks/useImageSequence';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ScrollTrigger, gsap, EASE, DURATION } from '@/lib/gsap';
import { clamp } from '@/lib/utils';
import { SequenceCanvas } from './SequenceCanvas';
import { SequenceLoader } from './SequenceLoader';
import { SequenceDebug } from './SequenceDebug';

export interface CinematicSequenceProps {
  /** Hero typography, rendered above the sequence inside the pinned frame. */
  children?: ReactNode;
  /** Fired once the loader has cleared and the site is interactive. */
  onReady?: () => void;
}

/**
 * The pinned, scroll-scrubbed architectural film.
 *
 * Scroll position → `progressRef` (a plain number) → canvas rAF loop. React is
 * never involved in the frame path: the only state this component holds is the
 * boot sequence (variant resolved → frames streaming → loader cleared).
 */
export function CinematicSequence({ children, onReady }: CinematicSequenceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const debugFrameRef = useRef<HTMLSpanElement | null>(null);
  const debugPercentRef = useRef<HTMLSpanElement | null>(null);

  const [variant, setVariant] = useState<SequenceVariant>('desktop');
  const [variantResolved, setVariantResolved] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const reduced = useReducedMotion();

  /* ── 1. Which frame set? ────────────────────────────────────────────────
     One probe, after mount, so server markup never diverges.              */
  useEffect(() => {
    let cancelled = false;
    const preferred: SequenceVariant = window.matchMedia(MEDIA.mobile).matches
      ? 'mobile'
      : 'desktop';

    void detectVariant(preferred).then((resolved) => {
      if (cancelled) return;
      setVariant(resolved);
      setVariantResolved(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const { framesRef, progressRef: loadProgressRef, state } = useImageSequence({
    variant,
    enabled: variantResolved && !reduced,
  });

  /* ── 2. Boot gate ────────────────────────────────────────────────────── */
  const criticalReady = state.criticalReady || state.status !== 'loading';

  useEffect(() => {
    if (reduced) {
      // No loader for reduced-motion visitors: the static hero is instant.
      setLoaderDone(true);
      return;
    }
    document.body.dataset.scrollLocked = 'true';
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [reduced]);

  const handleLoaderExit = useCallback(() => {
    setLoaderDone(true);
    delete document.body.dataset.scrollLocked;

    // The document height just changed; every pin below depends on this.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('pp:ready'));
      onReady?.();
    });
  }, [onReady]);

  /* ── 3. The scrub itself ───────────────────────────────────────────────
     Created only once the loader is gone, so pins are measured against the
     real document. Everything is torn down through one gsap.context.       */
  useEffect(() => {
    if (reduced || !loaderDone || !variantResolved) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        // Scroll distance scales with the viewport so the film lasts the same
        // number of "screens" on a phone as it does on a 1440p display.
        end: () => {
          const profile = getVariantProfile(variant);
          const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
          return `+=${Math.round(clamp(vh * profile.scrollLengthVh, 2600, 6400))}`;
        },
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: PALM_SEQUENCE.scrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // The single write in the whole frame path. No setState.
          progressRef.current = self.progress;
        },
      });

      // Hero typography steps aside so the architecture owns the frame.
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          yPercent: -6,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.55}`,
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, loaderDone, variantResolved, variant]);

  /* ── 4. Entrance for the hero copy, once the film is running ─────────── */
  useEffect(() => {
    if (reduced || !loaderDone) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        yPercent: 112,
        opacity: 0,
        duration: DURATION.cinematic,
        ease: EASE.out,
        stagger: 0.08,
        delay: 0.1,
      });
    }, overlayRef);
    return () => ctx.revert();
  }, [reduced, loaderDone]);

  const profile = getVariantProfile(variant);

  return (
    <>
      {!reduced && !loaderDone && (
        <SequenceLoader
          progressRef={loadProgressRef}
          loaded={state.loaded}
          ready={criticalReady}
          onExit={handleLoaderExit}
        />
      )}

      <section
        ref={sectionRef}
        id="hero"
        aria-label="Palm Paradise — cinematic architectural reveal"
        className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
      >
        {/* Screen-reader account of the film; the canvas itself is decorative. */}
        <p className="sr-only">
          A {PALM_SEQUENCE.totalFrames}-frame architectural film of Palm Paradise, scrubbed by
          scrolling: the approach begins at a distance, moves through the landscaping and the
          tower façade, and ends on an aerial view of the finished development.
        </p>

        <div className="absolute inset-0">
          {reduced ? (
            // Reduced motion: one static frame, no scrub, no loop.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={PALM_SEQUENCE.filePattern(PALM_SEQUENCE.posterFrame)}
              alt="Palm Paradise — still architectural view of the development"
              className="h-full w-full object-cover"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <SequenceCanvas
              framesRef={framesRef}
              progressRef={progressRef}
              variant={variant}
              frameRef={debugFrameRef}
              percentRef={debugPercentRef}
              className="absolute inset-0 h-full w-full"
            />
          )}

          <div className="pp-vignette pointer-events-none absolute inset-0" />
          <div className="pp-grain pointer-events-none absolute inset-0" />
        </div>

        <div
          ref={overlayRef}
          className="relative z-10 flex h-full w-full flex-col justify-end will-change-transform"
        >
          {children}
        </div>

        <SequenceDebug
          frameRef={debugFrameRef}
          percentRef={debugPercentRef}
          state={state}
          visible={SEQUENCE_DEBUG}
        />

        {/* Debug-only: which set is live and how long the pin is. */}
        {SEQUENCE_DEBUG && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed top-4 right-4 z-[90] font-mono text-[10px] tracking-[0.14em] text-ivory/35 uppercase"
          >
            set: {profile.folder} · cap {profile.maxTextureWidth}px
          </div>
        )}
      </section>
    </>
  );
}

export default CinematicSequence;
