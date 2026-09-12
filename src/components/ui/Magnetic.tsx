'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

export interface MagneticProps {
  children: ReactNode;
  /** Max travel in px. Kept tiny — magnetic, not gimmicky. */
  strength?: number;
  className?: string;
}

/**
 * Gently attracts its child toward the pointer on fine-pointer devices only.
 * The child springs home on leave. Disabled for touch and reduced motion.
 */
export function Magnetic({ children, strength = 10, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((event.clientX - cx) / rect.width) * strength * 2;
      const dy = ((event.clientY - cy) / rect.height) * strength * 2;
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}

export default Magnetic;
