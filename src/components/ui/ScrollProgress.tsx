'use client';

import { useEffect, useRef } from 'react';
import { clamp, pad2, setText } from '@/lib/utils';

interface SectionMark {
  index: string;
  top: number;
}

/**
 * A hairline vertical rail pinned to the right edge: gold fill = overall
 * progress, with the current section index above and the percentage below.
 * Pure DOM writes; no React state per scroll frame.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const indexRef = useRef<HTMLSpanElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let marks: SectionMark[] = [];
    let raf = 0;
    let pending = false;

    const refresh = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      marks = nodes.map((node) => ({
        index: node.dataset.section ?? '01',
        top: node.offsetTop,
      }));
    };

    const update = () => {
      pending = false;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = clamp(window.scrollY / max, 0, 1);

      if (fillRef.current) fillRef.current.style.transform = `scaleY(${ratio.toFixed(4)})`;
      setText(percentRef.current, `${pad2(Math.round(ratio * 100))}`);

      const probe = window.scrollY + window.innerHeight * 0.5;
      let current = marks[0]?.index ?? '01';
      for (const mark of marks) {
        if (mark.top <= probe) current = mark.index;
      }
      setText(indexRef.current, current);

      // Only reveal the rail once there is somewhere to go.
      if (rootRef.current) {
        rootRef.current.style.opacity = max > window.innerHeight * 1.2 ? '1' : '0';
      }
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };

    refresh();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refresh);
    window.addEventListener('resize', onScroll);
    // Re-measure after the loader clears and pins are laid out.
    window.addEventListener('pp:ready', refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pp:ready', refresh);
      window.removeEventListener('load', refresh);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed right-[clamp(0.75rem,2vw,1.5rem)] top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-center gap-3 opacity-0 transition-opacity duration-700 md:flex"
    >
      <span ref={indexRef} className="pp-label text-gold/80">
        01
      </span>
      <span className="relative block h-[min(32vh,240px)] w-px overflow-hidden bg-ivory/12">
        <span
          ref={fillRef}
          className="absolute inset-0 origin-top bg-gold"
          style={{ transform: 'scaleY(0)' }}
        />
      </span>
      <span className="pp-label text-ivory/40 tabular-nums">
        <span ref={percentRef}>00</span>%
      </span>
    </div>
  );
}

export default ScrollProgress;
