import { ArrowUpRight } from 'lucide-react';
import { services } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Services — the full IT catalogue as an editorial ledger: numbered rows,
   serif titles, one-line drape descriptions, craft tags. Each row links to
   the contact section with the service pre-selected.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Services() {
  return (
    <section className="sec services grain" id="services" aria-label="Services">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="overline rv">02 — The Services</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              Everything the IT<br />wardrobe needs.
            </h2>
          </div>
          <p className="side lede rv" style={{ ['--rd' as string]: '120ms' }}>
            Twelve disciplines, one cutting table. Take a single piece or the
            whole ensemble — it is all cut in the same house.
          </p>
        </div>

        <div className="svc-list">
          {services.map((s, i) => (
            <a
              key={s.n}
              className="svc-row rv"
              style={{ ['--rd' as string]: `${(i % 4) * 60}ms` }}
              href={`#contact`}
              aria-label={`Enquire about ${s.title}`}
            >
              <span className="n lbl num">{s.n}</span>
              <h3>{s.title}</h3>
              <div>
                <p className="line">{s.line}</p>
                <ul className="svc-tags" aria-label={`${s.title} covers`}>
                  {s.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <span className="go" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
