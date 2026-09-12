'use client';

import { useEffect, useRef } from 'react';
import { gsap, EASE, DURATION } from '@/lib/gsap';
import type { GalleryItem } from '@/config/projectData';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Cinematic full-screen viewer. Deep obsidian scrim, the plate centred, index
 * and caption below, arrow + keyboard navigation.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const item = items[index];

  /* Entrance + scroll lock. */
  useEffect(() => {
    document.body.dataset.scrollLocked = 'true';
    const root = rootRef.current;

    const ctx = root
      ? gsap.context(() => {
          gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: DURATION.short, ease: EASE.outSoft });
          gsap.fromTo(
            '[data-lightbox-plate]',
            { scale: 0.96, opacity: 0 },
            { scale: 1, opacity: 1, duration: DURATION.base, ease: EASE.out, delay: 0.05 },
          );
        }, root)
      : null;

    return () => {
      delete document.body.dataset.scrollLocked;
      ctx?.revert();
    };
  }, []);

  /* Keyboard nav. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate(Math.min(items.length - 1, index + 1));
      if (event.key === 'ArrowLeft') onNavigate(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length, index, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${items.length}: ${item.caption}`}
      className="fixed inset-0 z-[96] flex flex-col bg-obsidian/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-[clamp(1.25rem,4vw,3rem)] py-5">
        <span className="pp-label text-stone/60">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery viewer"
          className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-[clamp(1.25rem,6vw,6rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          data-lightbox-plate
          src={item.src}
          alt={item.alt}
          className="max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          type="button"
          aria-label="Previous image"
          disabled={index === 0}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(Math.max(0, index - 1));
          }}
          className="absolute left-[clamp(0.5rem,2vw,2rem)] top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-ivory/20 bg-obsidian/60 text-ivory transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          disabled={index === items.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(Math.min(items.length - 1, index + 1));
          }}
          className="absolute right-[clamp(0.5rem,2vw,2rem)] top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-ivory/20 bg-obsidian/60 text-ivory transition-colors hover:border-gold hover:text-gold disabled:opacity-25"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>

      <div className="flex items-baseline justify-between px-[clamp(1.25rem,4vw,3rem)] py-5">
        <p className="font-serif text-lg italic text-ivory/90">{item.caption}</p>
        <span className="pp-label text-stone/50">Palm Paradise — Gallery</span>
      </div>
    </div>
  );
}

export default Lightbox;
