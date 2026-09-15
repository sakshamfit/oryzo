import { ArrowUp } from 'lucide-react';
import { nav, services, site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Footer — Trendy Attire pattern: 4 → 2 → 1 columns, 44px link rows,
   script signature, safe-area aware bar.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Footer() {
  return (
    <footer className="foot on-maroon grain" id="foot">
      <div className="wrap">
        <div className="g">
          <div>
            <p className="word">hex<em>cyra</em></p>
            <p className="script" aria-hidden="true">Software, cut to measure.</p>
            <address className="lbl">
              {site.location}<br />
              {site.email}<br />
              {site.phone}
            </address>
          </div>

          <nav aria-label="Services">
            <p className="lbl">Services</p>
            <ul className="lbl">
              {services.slice(0, 6).map((s) => (
                <li key={s.n}><a className="u" href="#services">{s.title}</a></li>
              ))}
              <li><a className="u" href="#services">All twelve →</a></li>
            </ul>
          </nav>

          <nav aria-label="Studio">
            <p className="lbl">Studio</p>
            <ul className="lbl">
              {nav.map((l) => (
                <li key={l.href}><a className="u" href={l.href}>{l.label}</a></li>
              ))}
              <li><a className="u" href="#faq">FAQ</a></li>
            </ul>
          </nav>

          <nav aria-label="Start">
            <p className="lbl">Start</p>
            <ul className="lbl">
              <li><a className="u" href="#contact">Start a project</a></li>
              <li><a className="u" href={`mailto:${site.email}`}>Email the studio</a></li>
              <li><a className="u" href={site.phoneHref}>Call {site.phone}</a></li>
            </ul>
            <p className="lbl" style={{ marginTop: 14, color: 'var(--on-ink-mut)', lineHeight: 1.8 }}>
              {site.hours}
            </p>
          </nav>
        </div>

        <div className="bar lbl">
          <span>© {site.founded === new Date().getFullYear() ? site.founded : `${site.founded} — ${new Date().getFullYear()}`} {site.name} · {site.tagline}</span>
          <span className="grp">
            <span>Est. {site.founded}</span>
            <a className="u" href="#top">Back to top <ArrowUp size={12} aria-hidden="true" /></a>
          </span>
        </div>
      </div>
    </footer>
  );
}
