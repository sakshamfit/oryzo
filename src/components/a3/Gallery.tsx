import InView from './InView';
import { gallery } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Gallery — "Visuals" over "The Atmosphere", centered. Mosaic: 3 columns,
   auto-rows-[400px]; item 1 tall (row-span-2), item 2 wide (col-span-2),
   items 3 & 4 standard. Images grayscale-[20%] → full color + scale-[1.02].
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Gallery() {
  const spans = [
    'md:row-span-2',   // 1 — tall
    'md:col-span-2',   // 2 — wide
    '',                // 3 — standard
    '',                // 4 — standard
  ];

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#FDFBF9] px-6 py-24 text-[#1a1a1a] md:px-10 md:py-32">
      <InView>
        <div className="mb-12 text-center">
          <p className="fade-reveal text-[11px] uppercase tracking-[0.3em] text-black/50">{gallery.eyebrow}</p>
          <h2 className="fade-reveal mt-4 text-4xl font-medium tracking-tighter md:text-6xl" style={{ transitionDelay: '80ms' }}>
            {gallery.heading}
          </h2>
        </div>
      </InView>

      <InView>
        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:auto-rows-[400px] md:grid-cols-3">
          {gallery.items.map((g, i) => (
            <div key={g.img} className={`group relative overflow-hidden ${spans[i]}`}>
              <img
                src={g.img}
                alt={g.alt}
                loading="lazy"
                className="image-reveal h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}
