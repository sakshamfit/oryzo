'use client';

import { useEffect, useState } from 'react';
import { menuLinks, site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Nav — fixed, z-50, mix-blend-difference (white-on-dark / dark-on-light
   against the page). The <nav> itself is pointer-events-none so it never
   blocks clicks; only the inner div is pointer-events-auto.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Nav() {
  const [open, setOpen] = useState(false);

  /* lock scroll only while the menu is open — always restored */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* esc closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="pointer-events-auto flex items-center justify-between px-6 py-6 md:px-10">
          <a href="#top" className="text-sm font-medium uppercase tracking-[0.2em]" aria-label={`${site.name} — home`}>
            A3 <span className="opacity-50">{site.logoSpan}</span>
          </a>

          <div className="flex items-center gap-10">
            <a
              href="#projects"
              className="hidden items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] transition-opacity duration-500 hover:opacity-60 md:flex"
            >
              <iconify-icon icon="solar:gallery-linear" className="text-base" aria-hidden="true" />
              Projects
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="transition-opacity duration-500 hover:opacity-60"
            >
              <iconify-icon
                icon={open ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
                className="text-2xl"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* full-screen menu overlay (below the blend-mode nav) */}
      <div
        className={`fixed inset-0 z-40 bg-[#111] text-white transition-opacity duration-700 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28 md:px-10">
          <nav aria-label="Menu" className="flex flex-col gap-2">
            {menuLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 py-4 text-3xl font-light uppercase tracking-tight transition-colors duration-500 hover:text-white/60 md:text-4xl"
              >
                {l.label}
                <span className="text-xs tracking-[0.3em] text-white/30">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 text-sm text-white/50">
            <a href={site.phoneHref} className="text-white transition-opacity duration-500 hover:opacity-60">
              {site.phone}
            </a>
            <p>{site.hours}</p>
            <p className="text-white/40">{site.addressFull}</p>
          </div>
        </div>
      </div>
    </>
  );
}
