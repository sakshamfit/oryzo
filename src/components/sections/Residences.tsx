'use client';

import { RESIDENCES, RESIDENCES_META } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';

/**
 * Section 03 — residences as oversized editorial cards. Image breathes on
 * hover; typography carries the hierarchy.
 */
export function Residences() {
  return (
    <section
      id="residences"
      data-section="03"
      className="relative bg-forest py-[clamp(6rem,16vh,11rem)] text-ivory"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <SectionHeading
          label={RESIDENCES_META.label}
          lines={RESIDENCES_META.headline}
          accentLine={1}
          className="mb-[clamp(2rem,5vh,4rem)]"
        />
        <Reveal variant="up" className="-mt-[clamp(1.5rem,4vh,3rem)] mb-[clamp(3rem,7vh,5rem)]">
          <p className="max-w-[52ch] text-lede text-ivory/65">{RESIDENCES_META.body}</p>
        </Reveal>

        <div className="flex flex-col gap-[clamp(3rem,8vh,5.5rem)]">
          {RESIDENCES.map((res, i) => (
            <Reveal key={res.id} variant="up">
              <article
                className={cx(
                  'group grid items-center gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-12',
                )}
              >
                <div
                  className={cx(
                    'lg:col-span-7',
                    i % 2 === 1 ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1',
                  )}
                >
                  <ImageFrame
                    src={res.image}
                    alt={res.alt}
                    aspect="aspect-[16/11] lg:aspect-[16/10]"
                    parallax={4}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="w-full"
                    imgClassName="group-hover:scale-[1.03]"
                  />
                </div>

                <div
                  className={cx(
                    'lg:col-span-5',
                    i % 2 === 1 ? 'lg:order-1 lg:col-start-1 lg:pr-[clamp(1rem,3vw,3rem)]' : 'lg:col-start-8 lg:pl-[clamp(1rem,3vw,3rem)]',
                  )}
                >
                  <p className="pp-label text-gold/85">{res.typology}</p>
                  <h3 className="mt-3 font-serif text-[clamp(2rem,1.4rem+3vw,3.75rem)] font-light italic leading-none text-ivory">
                    {res.name}
                  </h3>

                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-metric font-sans font-extralight text-ivory">
                      {res.area.split(' ')[0]}
                    </span>
                    <span className="pp-label text-stone/60">{res.area.split(' ')[1] ?? ''}</span>
                  </div>
                  <p className="mt-2 text-body-lg text-ivory/60">{res.configuration}</p>

                  <p className="mt-5 max-w-[44ch] text-body-lg text-ivory/75">{res.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {res.highlights.map((h) => (
                      <li
                        key={h}
                        className="border border-ivory/15 px-3 py-1 text-micro tracking-[0.18em] text-ivory/60 uppercase"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <Button href="#contact" variant="outline" arrow="right">
                      View Residence
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Residences;
