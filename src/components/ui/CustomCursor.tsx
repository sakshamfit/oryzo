'use client';

import { useEffect, useRef, useState } from 'react';
import { damp } from '@/lib/utils';

/**
 * A quiet two-layer cursor: an instant gold dot and a lagging hairline ring that
 * swells over interactive targets. Fine pointers only; never touches touch.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.cursorActive = 'true';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let glowX = x;
    let glowY = y;
    let ringScale = 1;
    let targetScale = 1;
    let raf = 0;
    let last = performance.now();
    let visible = false;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const onOver = (event: MouseEvent) => {
      const interactive = (event.target as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], [data-cursor]',
      );
      targetScale = interactive ? 2.1 : 1;
      if (ringRef.current) {
        ringRef.current.style.borderColor = interactive
          ? 'rgba(191, 168, 117, 0.9)'
          : 'rgba(243, 239, 231, 0.35)';
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ringX = damp(ringX, x, 14, dt);
      ringY = damp(ringY, y, 14, dt);
      glowX = damp(glowX, x, 5, dt);
      glowY = damp(glowY, y, 5, dt);
      ringScale = damp(ringScale, targetScale, 10, dt);

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%,-50%) scale(${ringScale.toFixed(3)})`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%,-50%)`;
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursorActive;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[340px] w-[340px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #BFA875 0%, transparent 65%)',
        }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border border-ivory/35 opacity-0 transition-[border-color] duration-300"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-gold opacity-0"
      />
    </div>
  );
}

export default CustomCursor;
