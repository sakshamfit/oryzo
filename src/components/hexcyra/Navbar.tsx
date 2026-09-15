'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { nav, site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Navbar — Trendy Attire pattern: sticky + blur, 3-column couture grid
   (links · wordmark · utilities), reading progress, hamburger drawer ≤ 900px
   with scroll lock, ESC-to-close and auto-close on resize to desktop.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /* lock scroll while the drawer is open */
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('is-locked');
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('is-locked');
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.classList.remove('is-locked');
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  /* esc closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* close on resize back to desktop */
  useEffect(() => {
    const m = window.matchMedia('(min-width: 901px)');
    const handler = () => { if (m.matches) setOpen(false); };
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
  }, []);

  return (
    <>
      <header className="nav">
        <div className="wrap g">
          <nav className="links lbl" aria-label="Primary">
            {nav.slice(0, 4).map((l) => (
              <a key={l.href} className="u" href={l.href}>{l.label}</a>
            ))}
          </nav>

          <a className="mark" href="#top" aria-label={site.name + ' — home'}>

            hex<em>cyra</em>
          </a>

          <div className="util">
            <a className="u lbl hl" href="#work">Work</a>
            <a className="btn btn--sm btn--auto-mobile" href="#contact">
              Start a project <span className="ar" aria-hidden="true">↗</span>
            </a>
            <button
              className="burger"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div id="prog" className="prog" aria-hidden="true" />
      </header>

      <div className={`drawer ${open ? 'open' : ''}`} id="mobile-drawer" aria-hidden={!open}>
        <div className="backdrop" onClick={() => setOpen(false)} />
        <div className="panel" role="dialog" aria-modal="true" aria-label="Menu">
          <nav aria-label="Mobile navigation">
            {nav.map((l) => (
              <a key={l.href} className="dl" href={l.href} onClick={() => setOpen(false)}>
                {l.label} <span aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
          <div className="foot">
            <a className="btn" href="#contact" onClick={() => setOpen(false)}>
              Start a project <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href={site.phoneHref}>Call {site.phone}</a>
            <p className="lbl mut" style={{ textTransform: 'none', letterSpacing: '.04em', textAlign: 'center', lineHeight: 1.7 }}>
              {site.hours} · {site.location}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
