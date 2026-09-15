import InView from './InView';
import { highlights } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Highlights — bg #1a1a1a, text #f2f2f2. 3-column grid with icon, title and
   description, each column divided by border-t with 10% white opacity.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Highlights() {
  return (
    <section id="highlights" className="scroll-mt-24 bg-[#1a1a1a] text-[#f2f2f2]">
      <InView>
        <div className="grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-3 md:gap-10 md:px-10 md:py-32">
          {highlights.map((h, i) => (
            <div key={h.title} className="fade-reveal border-t border-white/10 pt-8" style={{ transitionDelay: `${i * 100}ms` }}>
              <iconify-icon icon={h.icon} className="text-2xl text-white/70" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-medium tracking-tight">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{h.desc}</p>
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}
