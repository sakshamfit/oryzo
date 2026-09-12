'use client';

import { ARCHITECTURE, ASSETS } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Section 02 — cinematic architecture: an immersive hero plate with parallax,
 * an overlapping editorial pair of detail studies, and a stat line.
 */
export function Architecture() {
  return (
    <section
      id="architecture"
      data-section="02"
      className="relative overflow-hidden bg-obsidian py-[clamp(6rem,16vh,11rem)] text-ivory"
    >
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)]">
        <SectionHeading label={ARCHITECTURE.label} lines={ARCHITECTURE.headline} accentLine={0} />

        {/* Immersive hero plate */}
        <Reveal variant="clip">
          <ImageFrame
            src={ASSETS.architecture.hero}
            alt="Palm Paradise tower elevation at dusk — placeholder architectural study"
            aspect="aspect-[16/9] md:aspect-[21/9]"
            parallax={6}
            sizes="100vw"
            className="w-full"
          />
        </Reveal>

        {/* Overlapping editorial pair */}
        <div className="relative mt-[clamp(2rem,6vh,4rem)] grid gap-[clamp(1.5rem,4vw,3rem)] md:grid-cols-12">
          <Reveal variant="up" className="md:col-span-5 md:col-start-1 md:translate-y-0">
            <ImageFrame
              src={ASSETS.architecture.detail01}
              alt="Recessed terrace detail — placeholder"
              aspect="aspect-[3/4]"
              parallax={4}
              className="w-full"
            />
            <DetailCaption title={ARCHITECTURE.details[0]?.title ?? ''} body={ARCHITECTURE.details[0]?.body ?? ''} />
          </Reveal>

          <Reveal variant="up" delay={0.12} className="md:col-span-5 md:col-start-8 md:-mt-[clamp(2rem,8vh,6rem)]">
            <ImageFrame
              src={ASSETS.architecture.detail02}
              alt="Ribbon balcony elevation detail — placeholder"
              aspect="aspect-[3/4]"
              parallax={5}
              className="w-full"
            />
            <DetailCaption title={ARCHITECTURE.details[1]?.title ?? ''} body={ARCHITECTURE.details[1]?.body ?? ''} />
          </Reveal>
        </div>

        {/* Body + stats */}
        <div className="mt-[clamp(3rem,8vh,5.5rem)] grid gap-[clamp(2rem,5vh,3.5rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <Reveal variant="up">
            <p className="max-w-[52ch] text-lede text-stone/80">{ARCHITECTURE.body}</p>
          </Reveal>

          <div className="grid grid-cols-3 gap-4">
            {ARCHITECTURE.stats.map((stat, i) => (
              <Reveal key={stat.label} variant="up" delay={0.06 * i} className="border-l border-ivory/12 pl-4">
                <p className="text-metric font-sans font-extralight text-ivory">{stat.value}</p>
                <p className="pp-label mt-2 text-stone/60">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailCaption({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4 flex items-start gap-4">
      <span className="mt-1 h-px w-8 shrink-0 bg-gold/70" />
      <div>
        <h3 className="text-h3 font-sans font-light text-ivory">{title}</h3>
        <p className="mt-1 text-body-lg text-stone/70">{body}</p>
      </div>
    </div>
  );
}

export default Architecture;
