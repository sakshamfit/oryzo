'use client';

import { LOCATION, ASSETS } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { MapPin } from 'lucide-react';

/**
 * Section 06 — location as a composed site study, not a map embed. Pulsing
 * markers anchor each destination to the placeholder artwork.
 */
export function LocationSection() {
  return (
    <section
      id="location"
      data-section="06"
      className="relative overflow-hidden bg-obsidian py-[clamp(6rem,16vh,11rem)] text-ivory"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="grid gap-[clamp(3rem,7vh,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
          <div>
            <SectionHeading label={LOCATION.label} lines={LOCATION.headline} accentLine={1} className="mb-8" />
            <Reveal variant="up">
              <p className="max-w-[48ch] text-lede text-stone/75">{LOCATION.body}</p>
            </Reveal>

            <div className="mt-[clamp(2rem,5vh,3.5rem)]">
              {LOCATION.points.map((point, i) => (
                <Reveal
                  key={point.label}
                  variant="up"
                  delay={0.04 * i}
                  className="group flex items-baseline justify-between gap-4 border-t border-ivory/10 py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="pp-label text-gold/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-body-lg text-ivory/85 uppercase tracking-[0.14em]">{point.label}</span>
                  </span>
                  <span className="font-serif text-lg italic text-stone/70 transition-colors group-hover:text-gold">
                    {point.distance}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* The map plate */}
          <Reveal variant="clip" className="relative">
            <div className="pp-frame aspect-[4/3] w-full lg:aspect-[10/7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.location.map}
                alt={LOCATION.mapAlt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Pulsing markers, positioned from config percentages. */}
              {LOCATION.points.map((point, i) => (
                <div
                  key={point.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-gold/60" style={{ animationDelay: `${i * 0.35}s` }} />
                    <span className="relative h-[7px] w-[7px] rounded-full border border-obsidian bg-gold" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-micro tracking-[0.2em] text-ivory/85 uppercase">
                    {point.label}
                  </span>
                </div>
              ))}

              {/* Central site marker */}
              <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 border border-gold/60 bg-obsidian/70 px-3 py-2 backdrop-blur-sm">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.4} />
                  <span className="pp-label text-gold">Palm Paradise</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
