import { hero } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Hero — the couture opening. Cream ground inside a hairline frame,
   Cormorant display with a script swash under the accent word (Saree Ghar
   signature), terracotta CTA, staggered entrance driven by `.seq` + body.live.
   The art panel carries the parallax (`data-speed`).
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section className="hero grain" id="top" aria-label="Introduction">
      <div className="frame" aria-hidden="true" />

      <p className="corner tl lbl seq" style={{ ['--d' as string]: '250ms' }}>
        Est. 2026 — Software Atelier
      </p>
      <p className="corner br lbl seq" style={{ ['--d' as string]: '300ms' }}>
        Web · Apps · SaaS<br />Systems · Support
      </p>

      <div className="wrap grid">
        <div className="stage">
          <p className="overline seq" style={{ ['--d' as string]: '100ms' }}>{hero.overline}</p>

          <h1 className="dsp">
            {hero.display.map((word, i) => (
              <span className="ln" key={word}>
                <span style={{ ['--d' as string]: `${180 + i * 110}ms` }}>
                  {i === hero.display.length - 1 ? (
                    <span className="accent">
                      {word}
                      <span className="swash script" aria-hidden="true">hexcyra</span>
                    </span>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="lede copy seq" style={{ ['--d' as string]: '560ms' }}>{hero.lede}</p>

          <div className="cta seq" style={{ ['--d' as string]: '680ms' }}>
            <a className="btn btn--lg" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label} <span className="ar" aria-hidden="true">↗</span>
            </a>
            <a className="btn btn--lg btn--ghost" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </div>

          <p className="meta lbl seq" style={{ ['--d' as string]: '800ms' }}>
            {hero.meta.map((m) => <span key={m}>{m}</span>)}
          </p>

          <p className="cue lbl seq" style={{ ['--d' as string]: '900ms' }} aria-hidden="true">
            <span className="bar" /> Scroll
          </p>
        </div>

        <div className="art">
          <figure className="ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.art}
              alt="Abstract couture-inspired composition in cream, maroon and terracotta"
              data-speed="0.06"
              fetchPriority="high"
            />
            <span className="stamp lbl">hexcyra — n°01</span>
          </figure>
          <div className="ring" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
