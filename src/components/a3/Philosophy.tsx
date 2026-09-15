import InView from './InView';
import { assets, metrics, philosophy } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Philosophy — 12-column grid: 3-col sticky metrics (md:sticky md:top-32),
   2-col spacer, 7-col narrative with the .image-reveal figure and a
   backdrop-blurred caption at bottom-6 left-6.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Philosophy() {
  return (
    <section id="philosophy" className="scroll-mt-24 bg-[#FDFBF9] text-[#1a1a1a]">
      <div className="grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
        {/* sticky metrics */}
        <div className="self-start md:sticky md:top-32 md:col-span-3">
          <div className="flex flex-col gap-10">
            {metrics.map((m) => (
              <div key={m.value} className="border-t border-black/10 pt-6">
                <iconify-icon icon={m.icon} className="text-2xl text-black/60" aria-hidden="true" />
                <p className="mt-4 text-2xl font-medium tracking-tight">{m.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-black/50">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* spacer */}
        <div className="hidden md:block md:col-span-2" aria-hidden="true" />

        {/* narrative */}
        <div className="md:col-span-7">
          <InView>
            <p className="fade-reveal text-[11px] uppercase tracking-[0.3em] text-black/50">{philosophy.eyebrow}</p>
            <h2 className="fade-reveal mt-6 text-4xl font-medium leading-[1.02] tracking-tighter md:text-6xl" style={{ transitionDelay: '80ms' }}>
              {philosophy.heading1}{' '}
              <span className="font-serif font-light italic">{philosophy.italic}</span>
              {philosophy.heading2}
            </h2>
            {philosophy.copy.map((p, i) => (
              <p
                key={i}
                className="fade-reveal mt-8 max-w-xl text-[15px] leading-relaxed text-black/60"
                style={{ transitionDelay: `${160 + i * 80}ms` }}
              >
                {p}
              </p>
            ))}
          </InView>

          <InView className="mt-14" once>
            <figure className="relative cursor-none">
              <img
                src={assets.philosophy}
                alt="A3 interior detailing — material and light study"
                loading="lazy"
                className="image-reveal aspect-[4/3] w-full object-cover grayscale-[30%] transition-all duration-700 hover:grayscale-0"
              />
              <figcaption className="absolute bottom-6 left-6 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {philosophy.imageCaption}
              </figcaption>
            </figure>
          </InView>
        </div>
      </div>
    </section>
  );
}
