'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap, EASE, DURATION } from '@/lib/gsap';

export type RevealVariant = 'fade' | 'up' | 'line' | 'clip' | 'scale';

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds after the trigger. */
  delay?: number;
  /** ScrollTrigger start — default just inside the bottom edge. */
  start?: string;
  /** Optional distance override for `up`. */
  y?: number;
  as?: 'div' | 'span' | 'p' | 'figure' | 'li' | 'section' | 'header' | 'footer';
  className?: string;
  style?: CSSProperties;
  once?: boolean;
}

/**
 * One consistent, restrained entrance language: everything rises a little and
 * settles with an expo curve, or unveils behind a clip. No bounce, no elastic.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  start = 'top 86%',
  y = 44,
  as: Tag = 'div',
  className,
  style,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const common = {
        delay,
        duration: DURATION.base,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start, once },
      };

      switch (variant) {
        case 'fade':
          gsap.from(el, { opacity: 0, ...common });
          break;
        case 'up':
          gsap.from(el, { opacity: 0, y, ...common });
          break;
        case 'scale':
          gsap.from(el, { opacity: 0, scale: 0.96, transformOrigin: 'center', ...common });
          break;
        case 'clip':
          gsap.from(el, { clipPath: 'inset(0 0 100% 0)', ...common, duration: DURATION.long });
          break;
        case 'line':
          gsap.from(el.querySelectorAll('[data-line]'), {
            yPercent: 112,
            opacity: 0.001,
            duration: DURATION.long,
            ease: EASE.out,
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: el, start, once },
          });
          break;
      }
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, start, y, once]);

  return (
    // The ref type is widened because `as` is a fixed union of tags.
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}

export default Reveal;
