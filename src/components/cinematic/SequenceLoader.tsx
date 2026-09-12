'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap, EASE, DURATION } from '@/lib/gsap';
import { TOTAL_FRAMES } from '@/config/palmSequence';
import { damp, setText } from '@/lib/utils';

/** Minimum time the loader is on screen, so it never reads as a flash. */
const MIN_VISIBLE_MS = 900;

export interface SequenceLoaderProps {
  /** Live load ratio, 0 → 1. Read in a rAF loop, never through React state. */
  progressRef: RefObject<number>;
  loaded: number;
  total?: number;
  /** True once the site is allowed to become interactive. */
  ready: boolean;
  /** Fired after the exit animation, when the overlay can be unmounted. */
  onExit: () => void;
}

/**
 * The door into the film.
 *
 * Editorial, not gamified: a wordmark, one line of context, a hairline rail and
 * a tabular percentage. No spinner, no logo bounce.
 */
export function SequenceLoader({
  progressRef,
  loaded,
  total = TOTAL_FRAMES,
  ready,
  onExit,
}: SequenceLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const railRef = useRef<HTMLSpanElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const mountedAt = useRef<number>(0);
  const [exiting, setExiting] = useState(false);

  /* Entrance + live counter ─────────────────────────────────────────────── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    mountedAt.current = performance.now();

    const ctx = gsap.context(() => {
      gsap.set('[data-loader-reveal]', { yPercent: 118, opacity: 0 });
      gsap.set('[data-loader-rail]', { scaleX: 0, transformOrigin: 'left center' });

      gsap
        .timeline({ defaults: { ease: EASE.out, duration: DURATION.base } })
        .to('[data-loader-reveal]', {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.long,
          stagger: 0.09,
        })
        .to('[data-loader-rail]', { scaleX: 0.001, duration: 0.01 }, 0);
    }, root);

    // Counter + rail chase the real load ratio at display refresh.
    let raf = 0;
    let last = performance.now();
    let shown = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      shown = damp(shown, progressRef.current, 6, dt);
      const ratio = Math.min(1, Math.max(0, shown));

      setText(percentRef.current, `${String(Math.round(ratio * 100)).padStart(2, '0')}`);
      setText(
        counterRef.current,
        `${String(Math.min(total, loaded)).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
      );
      if (railRef.current) railRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [progressRef, loaded, total]);

  /* Exit ────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!ready || exiting) return;

    const elapsed = performance.now() - mountedAt.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
    let raf = 0;

    const exit = () => {
      setExiting(true);
      const root = rootRef.current;
      if (!root) {
        onExit();
        return;
      }

      const ctx = gsap.context(() => {
        gsap
          .timeline({ onComplete: onExit })
          .to('[data-loader-reveal]', {
            yPercent: -60,
            opacity: 0,
            duration: DURATION.base,
            ease: EASE.inOut,
            stagger: 0.045,
          })
          .to(
            root,
            {
              opacity: 0,
              duration: DURATION.base,
              ease: EASE.inOut,
              delay: 0.1,
            },
            '-=0.35',
          );
      }, root);

      // Keep a handle so a fast unmount cannot orphan the timeline.
      return () => ctx.revert();
    };

    raf = window.setTimeout(exit, delay);
    return () => window.clearTimeout(raf);
  }, [ready, exiting, onExit]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading the Palm Paradise architectural experience"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian px-[clamp(1.25rem,5vw,6rem)] py-[clamp(1.5rem,4vh,3rem)]"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="pp-label text-stone/70" data-loader-reveal>
          Palm Paradise
        </span>
        <span className="pp-label text-stone/40" data-loader-reveal>
          {exiting ? 'Entering' : 'Loading'}
        </span>
      </div>

      <div className="max-w-[min(100%,46rem)]">
        <p
          className="pp-label mb-[clamp(1rem,2.5vh,2rem)] text-gold/80"
          data-loader-reveal
        >
          Digital Architectural Experience
        </p>

        <h1 className="font-serif text-[clamp(2.75rem,1.6rem+9vw,9rem)] leading-[0.9] font-light tracking-[-0.03em] text-ivory">
          <span className="pp-line" data-loader-reveal>
            <span>Palm</span>
          </span>
          <span className="pp-line text-gold" data-loader-reveal>
            <span>Paradise</span>
          </span>
        </h1>

        <div
          className="mt-[clamp(1.5rem,4vh,3rem)] flex items-baseline gap-4"
          data-loader-reveal
        >
          <span className="pp-label text-stone/60">Loading</span>
          <span className="font-sans text-[clamp(1.25rem,1rem+1.2vw,2rem)] leading-none font-light tabular-nums text-ivory">
            <span ref={percentRef}>00</span>
            <span className="text-gold">%</span>
          </span>
          <span className="pp-label ml-auto text-stone/35">
            <span ref={counterRef}>00 / 30</span> frames
          </span>
        </div>
      </div>

      <div className="relative h-px w-full overflow-hidden bg-ivory/10">
        <span
          ref={railRef}
          data-loader-rail
          className="absolute inset-0 origin-left bg-gold"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}

export default SequenceLoader;
