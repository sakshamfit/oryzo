'use client';

import { VISION } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Section 01 — the editorial breather after the film. Warm ivory, large type,
 * a pull quote and three pillars.
 */
export function Vision() {
  return (
    <section
      id="vision"
      data-section="01"
      className="relative bg-ivory py-[clamp(6rem,16vh,11rem)] text-obsidian"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="grid gap-[clamp(3rem,8vh,6rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[clamp(3rem,6vw,7rem)]">
          <div>
            <SectionHeading label={VISION.label} lines={VISION.headline} tone="light" accentLine={1} />

            <Reveal variant="up">
              <p className="max-w-[52ch] text-lede text-obsidian/75">{VISION.body}</p>
            </Reveal>

            <Reveal variant="up" delay={0.1} className="mt-[clamp(2.5rem,6vh,4rem)]">
              <blockquote className="border-l border-gold/60 pl-[clamp(1.25rem,3vw,2.5rem)]">
                <p className="max-w-[28ch] font-serif text-[clamp(1.5rem,1.2rem+2vw,2.75rem)] italic leading-tight text-obsidian/85">
                  {VISION.pullQuote}
                </p>
              </blockquote>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end gap-0">
            {VISION.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                variant="up"
                delay={0.06 * i}
                className="border-t border-obsidian/10 py-[clamp(1.5rem,3.5vh,2.5rem)]"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-serif text-lg italic text-gold">{pillar.index}</span>
                  <div>
                    <h3 className="text-h3 font-sans font-light text-obsidian">{pillar.title}</h3>
                    <p className="mt-2 max-w-[42ch] text-body-lg text-obsidian/65">{pillar.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;
