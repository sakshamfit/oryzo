import { assets, hero } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Hero — h-[95vh] on #111. Layers: image (absolute inset-0, object-bottom,
   opacity-70), gradient overlay (absolute inset-0), content (relative z-10).
   Heading is Inter Tight tracking-tighter with a serif italic font-light span
   for the accent word — the deliberate inconsistency of the reference.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section id="top" className="relative h-[95vh] overflow-hidden bg-[#111]">
      {/* image layer */}
      <img
        src={assets.hero}
        alt="Modern interior designed by A3 — Gorakhpur"
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-70"
        fetchPriority="high"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" aria-hidden="true" />

      {/* content layer */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-0 md:px-10">
        <p className="rise mb-6 text-[11px] uppercase tracking-[0.3em] text-white/60" style={{ animationDelay: '150ms' }}>
          {hero.eyebrow}
        </p>

        <h1
          className="rise max-w-5xl text-5xl font-medium leading-[0.98] tracking-tighter text-white md:text-8xl"
          style={{ animationDelay: '300ms' }}
        >
          {hero.line1}{' '}
          <span className="font-serif font-light italic">{hero.italic}</span> {hero.line2}
        </h1>

        <div className="rise mt-10 flex flex-col justify-between gap-6 border-t border-white/20 py-6 md:flex-row md:items-end" style={{ animationDelay: '550ms' }}>
          <p className="max-w-md text-sm leading-relaxed text-white/60">{hero.copy}</p>
          <a
            href={hero.ctaHref}
            className="group flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-white"
          >
            {hero.cta}
            <iconify-icon
              icon="solar:arrow-right-linear"
              className="text-lg transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
