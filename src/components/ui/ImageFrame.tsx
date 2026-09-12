'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, EASE } from '@/lib/gsap';
import { cx } from '@/lib/utils';

export interface ImageFrameProps {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Gentle vertical parallax on scroll. */
  parallax?: number;
  className?: string;
  imgClassName?: string;
}

/**
 * Editorial image frame: fixed aspect (zero layout shift), next/image for
 * responsive srcset + lazy loading, and optional scroll parallax on a GPU
 * transform only.
 */
export function ImageFrame({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  sizes = '(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 92vw',
  priority = false,
  parallax = 0,
  className,
  imgClassName,
}: ImageFrameProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const moverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!parallax) return;
    const frame = frameRef.current;
    const mover = moverRef.current;
    if (!frame || !mover) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mover,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: EASE.linear,
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={frameRef} className={cx('pp-frame', aspect, className)}>
      <div ref={moverRef} className="absolute inset-[-8%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          className={cx('object-cover', imgClassName)}
        />
      </div>
    </div>
  );
}

export default ImageFrame;
