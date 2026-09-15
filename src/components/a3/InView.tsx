'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   InView — adds `.in-view` when the element enters the viewport, which drives
   the `.image-reveal` clip-path and `.fade-reveal` transitions. Pure observer:
   it never touches scroll behavior.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function InView({
  className = '',
  children,
  once = true,
}: {
  className?: string;
  children: ReactNode;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('in-view');
            if (once) io.disconnect();
          } else if (!once) {
            el.classList.remove('in-view');
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
