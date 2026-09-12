'use client';

import type { ComponentType } from 'react';
import {
  Waves,
  Dumbbell,
  Trees,
  Blocks,
  Armchair,
  Mountain,
  ShieldCheck,
  Car,
  type LucideIcon,
} from 'lucide-react';
import { AMENITIES, AMENITIES_META } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  trees: Trees,
  blocks: Blocks,
  armchair: Armchair,
  mountain: Mountain,
  shield: ShieldCheck,
  car: Car,
};

/**
 * Section 04 — a full-width dark amenities index. Numbered editorial rows with
 * hairline separators and a whisper of iconography — never an icon-card grid.
 */
export function Amenities() {
  return (
    <section
      id="amenities"
      data-section="04"
      className="relative bg-obsidian py-[clamp(6rem,16vh,11rem)] text-ivory"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="mb-[clamp(3rem,7vh,5rem)] grid gap-[clamp(2rem,5vh,3rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <SectionHeading label={AMENITIES_META.label} lines={AMENITIES_META.headline} className="mb-0" />
          <Reveal variant="up">
            <p className="max-w-[44ch] text-lede text-stone/70 lg:pb-2">
              The amenity programme is generous where it matters, and invisible where it does not.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-[clamp(2rem,6vw,6rem)] md:grid-cols-2">
          {AMENITIES.map((amenity, i) => {
            const Icon: ComponentType<{ className?: string; strokeWidth?: number }> =
              ICONS[amenity.icon] ?? Waves;
            return (
              <Reveal
                key={amenity.label}
                variant="up"
                delay={0.04 * (i % 2)}
                className="group border-t border-ivory/10 py-[clamp(1.5rem,3.5vh,2.5rem)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="pp-label text-gold/60">{amenity.label}</span>
                    <h3 className="text-h3 font-sans font-light text-ivory transition-colors duration-300 group-hover:text-gold">
                      {amenity.title}
                    </h3>
                  </div>
                  <Icon
                    className="h-5 w-5 shrink-0 text-stone/40 transition-colors duration-300 group-hover:text-gold"
                    strokeWidth={1.2}
                  />
                </div>
                <p className="mt-2 max-w-[46ch] pl-[calc(0.75rem+1.6em)] text-body-lg text-stone/60">
                  {amenity.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Amenities;
