'use client';

import { METRICS, INVESTMENT } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Section 08 — the numbers, presented as an editorial ledger. All values are
 * placeholders flagged in src/config/projectData.ts.
 */
export function Investment() {
  return (
    <section
      id="investment"
      data-section="08"
      className="relative bg-ivory py-[clamp(6rem,16vh,11rem)] text-obsidian"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="grid gap-[clamp(3rem,7vh,5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-end">
          <SectionHeading label={INVESTMENT.label} lines={INVESTMENT.headline} tone="light" accentLine={1} className="mb-0" />
          <Reveal variant="up">
            <p className="max-w-[48ch] text-lede text-obsidian/70 lg:pb-2">{INVESTMENT.body}</p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,8vh,5.5rem)] grid grid-cols-2 gap-x-6 gap-y-[clamp(2.5rem,6vh,4rem)] md:grid-cols-5">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} variant="up" delay={0.05 * i} className="border-t border-obsidian/15 pt-5">
              <p className="text-metric font-sans font-extralight text-obsidian">{metric.value}</p>
              <p className="pp-label mt-3 text-obsidian/70">{metric.label}</p>
              <p className="mt-1 text-micro tracking-[0.16em] text-obsidian/40 uppercase">{metric.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" className="mt-[clamp(3rem,8vh,5rem)]">
          <p className="max-w-[80ch] text-micro leading-relaxed tracking-[0.08em] text-obsidian/45">
            {INVESTMENT.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Investment;
