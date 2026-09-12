'use client';

import { BRAND } from '@/config/projectData';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { Button } from '@/components/ui/Button';
import { useSmoothScroll } from '@/components/ui/SmoothScroll';

/**
 * The film's opening title card, set bottom-left so the architecture (anchored
 * right) is never covered. Typography steps aside on scroll — see the scrub
 * engine in CinematicSequence.
 */
export function Hero() {
  const smooth = useSmoothScroll();

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    smooth.toAnchor(href);
  };

  return (
    <CinematicSequence>
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(4.5rem,11vh,7rem)]">
        <div className="max-w-[min(100%,46rem)]">
          <h1 className="font-sans font-extralight tracking-[-0.04em] text-ivory">
            <span className="pp-line text-[clamp(3.2rem,1.4rem+11vw,11rem)] leading-[0.86]">
              <span data-hero-reveal>{BRAND.line1.toUpperCase()}</span>
            </span>
            <span className="pp-line text-[clamp(3.2rem,1.4rem+11vw,11rem)] leading-[0.86]">
              <span data-hero-reveal className="font-serif italic text-gold">
                {BRAND.line2}
              </span>
            </span>
          </h1>

          <p
            data-hero-reveal
            className="mt-[clamp(1.25rem,3vh,2.25rem)] font-serif text-[clamp(1.25rem,1rem+1.6vw,2.25rem)] italic leading-snug text-ivory/90"
          >
            {BRAND.tagline}
          </p>

          <p
            data-hero-reveal
            className="mt-3 max-w-[32ch] text-lede text-stone/80"
          >
            {BRAND.supporting}
          </p>

          <div
            data-hero-reveal
            className="mt-[clamp(1.75rem,4vh,3rem)] flex flex-wrap items-center gap-4"
          >
            <Button href="#residences" onClick={go('#residences')} variant="solid">
              {BRAND.primaryCta}
            </Button>
            <Button href="#vision" onClick={go('#vision')} variant="ghost" arrow="right">
              {BRAND.secondaryCta}
            </Button>
          </div>
        </div>

        {/* Scroll affordance — fades with the copy. */}
        <div
          data-hero-reveal
          className="pointer-events-none absolute bottom-[clamp(1.25rem,4vh,2.5rem)] right-[clamp(1.25rem,4vw,3rem)] hidden flex-col items-center gap-2 md:flex"
          aria-hidden="true"
        >
          <span className="pp-label text-ivory/50">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-ivory/15">
            <span className="animate-scrollhint absolute inset-x-0 top-0 h-1/2 bg-gold" />
          </span>
        </div>
      </div>
    </CinematicSequence>
  );
}

export default Hero;
