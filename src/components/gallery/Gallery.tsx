'use client';

import { useState } from 'react';
import { GALLERY, GALLERY_META } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Lightbox } from '@/components/gallery/Lightbox';
import { cx } from '@/lib/utils';

const RATIO: Record<string, { aspect: string; width: string }> = {
  portrait: { aspect: 'aspect-[3/4]', width: 'md:w-[min(30rem,34vw)]' },
  landscape: { aspect: 'aspect-[3/2]', width: 'md:w-[min(42rem,46vw)]' },
  square: { aspect: 'aspect-square', width: 'md:w-[min(32rem,36vw)]' },
};

/**
 * Section 07 — an editorial rail on desktop (native, snap-scrolling), a clean
 * vertical stack on phones. Tapping any plate opens the cinematic lightbox.
 */
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      data-section="07"
      className="relative bg-forest py-[clamp(6rem,16vh,11rem)] text-ivory"
    >
      <div className="mx-auto mb-[clamp(2.5rem,6vh,4.5rem)] w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <SectionHeading label={GALLERY_META.label} lines={GALLERY_META.headline} className="mb-6" />
        <Reveal variant="up">
          <p className="max-w-[52ch] text-lede text-ivory/65">{GALLERY_META.body}</p>
        </Reveal>
      </div>

      {/* Horizontal rail on md+, vertical stack below. data-lenis-prevent keeps
          the native horizontal wheel/touch behaviour independent of Lenis. */}
      <div
        data-lenis-prevent
        className="flex flex-col gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-4 md:flex-row md:items-stretch md:gap-8 md:snap-x md:snap-proximity"
        style={{ scrollbarWidth: 'none' }}
      >
        {GALLERY.map((item, i) => {
          const ratio = RATIO[item.ratio] ?? RATIO.portrait!;
          return (
            <Reveal
              key={item.src}
              variant="up"
              delay={0.03 * (i % 3)}
              className={cx('group shrink-0 snap-center', ratio.width)}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className="block w-full text-left focus-visible:outline-gold"
                aria-label={`Open gallery image: ${item.caption}`}
              >
                <ImageFrame
                  src={item.src}
                  alt={item.alt}
                  aspect={ratio.aspect}
                  parallax={0}
                  sizes="(min-width: 768px) 40vw, 92vw"
                  className="w-full"
                  imgClassName="group-hover:scale-[1.03]"
                />
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-body-lg text-ivory/85">{item.caption}</span>
                  <span className="pp-label text-ivory/40">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {active !== null && (
        <Lightbox items={GALLERY} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
      )}
    </section>
  );
}

export default Gallery;
