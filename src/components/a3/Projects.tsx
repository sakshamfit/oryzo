'use client';

import { useRef, useState } from 'react';
import { projects } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Projects — "Featured Projects" sticky header row with L/R arrow buttons.
   List items are `group` rows: border-t, hover:bg-[#F9F9F7], info in
   md:col-span-4, image in md:col-span-8 with duration-1000
   group-hover:scale-105 and the inset-0 bg-stone-900/0 → /5 overlay.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Projects() {
  const items = useRef<(HTMLElement | null)[]>([]);
  const [idx, setIdx] = useState(0);

  const go = (dir: 1 | -1) => {
    const next = Math.min(Math.max(idx + dir, 0), projects.length - 1);
    setIdx(next);
    items.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="projects" className="scroll-mt-16 bg-[#FDFBF9] text-[#1a1a1a]">
      {/* sticky header-style row */}
      <div className="sticky top-0 z-20 border-b border-black/10 bg-[#FDFBF9]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em]">Featured Projects</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center border border-black/15 transition-colors duration-500 hover:bg-[#F9F9F7]"
            >
              <iconify-icon icon="solar:arrow-left-linear" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center border border-black/15 transition-colors duration-500 hover:bg-[#F9F9F7]"
            >
              <iconify-icon icon="solar:arrow-right-linear" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10">
        {projects.map((p, i) => (
          <article
            key={p.name}
            ref={(el) => { items.current[i] = el; }}
            className="group grid scroll-mt-24 grid-cols-1 border-t border-black/10 transition-colors duration-500 last:border-b hover:bg-[#F9F9F7] md:grid-cols-12"
          >
            {/* info — left */}
            <div className="flex flex-col justify-between p-6 md:col-span-4 md:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/40">{p.location}</p>
                <h3 className="mt-4 text-3xl font-medium tracking-tighter md:text-4xl">{p.name}</h3>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/50">{p.desc}</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-wider text-black/50">
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:maximize-square-linear" aria-hidden="true" />
                  {p.area}
                </span>
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:bed-linear" aria-hidden="true" />
                  {p.type}
                </span>
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:tag-price-linear" aria-hidden="true" />
                  {p.price}
                </span>
              </div>
            </div>

            {/* image — right */}
            <div className="relative aspect-[16/10] overflow-hidden md:col-span-8">
              <img
                src={p.img}
                alt={`${p.name} — interior by A3`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[30%] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-500 group-hover:bg-stone-900/5" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
