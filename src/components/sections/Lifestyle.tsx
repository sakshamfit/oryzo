'use client';

import { LIFESTYLE } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Reveal } from '@/components/ui/Reveal';
import { cx } from '@/lib/utils';

const SPANS = [
  'md:col-span-5',
  'md:col-span-7 md:mt-[clamp(2rem,10vh,7rem)]',
  'md:col-span-7 md:-mt-[clamp(1rem,5vh,4rem)]',
  'md:col-span-5 md:mt-[clamp(2rem,10vh,7rem)]',
];

/**
 * Section 05 — an asymmetric magazine spread. Tall/wide plates interlock with
 * offset baselines and quiet serif captions.
 */
export function Lifestyle() {
  return (
    <section
      id="lifestyle"
      data-section="05"
      className="relative bg-ivory py-[clamp(6rem,16vh,11rem)] text-obsidian"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <SectionHeading label={LIFESTYLE.label} lines={['A Better Pace', 'of Life.']} tone="light" accentLine={1} />

        <div className="grid gap-[clamp(2rem,5vw,4rem)] md:grid-cols-12">
          {LIFESTYLE.panels.map((panel, i) => (
            <Reveal
              key={panel.headline}
              variant="up"
              delay={0.05 * (i % 2)}
              className={cx(SPANS[i], 'group')}
            >
              <ImageFrame
                src={panel.image}
                alt={panel.alt}
                aspect={panel.span === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'}
                parallax={panel.span === 'tall' ? 6 : 4}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="w-full"
                imgClassName="group-hover:scale-[1.03]"
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-[clamp(1.5rem,1.2rem+1.6vw,2.5rem)] italic leading-none text-obsidian/90">
                  {panel.headline}
                </h3>
                <span className="pp-label text-obsidian/40">0{i + 1}</span>
              </div>
              <p className="mt-2 max-w-[46ch] text-body-lg text-obsidian/60">{panel.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lifestyle;
