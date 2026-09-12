'use client';

import dynamic from 'next/dynamic';
import { CTA, CONTACT } from '@/config/projectData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { useSmoothScroll } from '@/components/ui/SmoothScroll';

/* Three.js is only worth it here, so it is split out of the main bundle and
   mounted without SSR. The site is fully functional if it never loads. */
const Atmosphere = dynamic(
  () => import('@/components/three/Atmosphere').then((mod) => mod.Atmosphere),
  { ssr: false, loading: () => null },
);

/**
 * Section 09 — the enormous closing CTA: near-black, atmospheric depth, and a
 * single pair of actions.
 */
export function CallToAction() {
  const smooth = useSmoothScroll();

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    smooth.toAnchor(href);
  };

  return (
    <section
      id="cta"
      data-section="09"
      className="relative overflow-hidden bg-obsidian py-[clamp(8rem,22vh,15rem)] text-ivory"
    >
      <Atmosphere className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        <Reveal variant="fade">
          <p className="pp-label mx-auto mb-8 text-gold/80">{CTA.label}</p>
        </Reveal>

        <SectionHeading
          label=""
          lines={CTA.headline}
          align="center"
          accentLine={1}
          as="h2"
          className="mb-[clamp(1.5rem,4vh,2.5rem)]"
        />

        <Reveal variant="up">
          <p className="mx-auto max-w-[46ch] text-lede text-stone/75">{CTA.body}</p>
        </Reveal>

        <Reveal variant="up" delay={0.12} className="mt-[clamp(2rem,6vh,3.5rem)]">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="#contact" onClick={go('#contact')} variant="solid">
              {CTA.primary}
            </Button>
            <Button href="#contact" onClick={go('#contact')} variant="outline" arrow="right">
              {CTA.secondary}
            </Button>
          </div>
          <p className="mt-6 text-micro tracking-[0.16em] text-stone/40 uppercase">{CTA.footnote}</p>
        </Reveal>

        <Reveal variant="fade" delay={0.2} className="mt-[clamp(2rem,6vh,3rem)]">
          <a href={CONTACT.emailHref} className="pp-link font-serif text-[clamp(1.1rem,1rem+1.4vw,2rem)] italic text-ivory/80">
            {CONTACT.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default CallToAction;
