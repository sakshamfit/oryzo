import { ArrowRight } from 'lucide-react';
import { engagement } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Engagement — three ways to work together, on maroon. The featured model
   (Dedicated Pod) is raised in ivory.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Engagement() {
  return (
    <section className="sec engagement on-maroon grain" id={engagement.id} aria-label="Engagement models">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="overline rv">{engagement.index} — {engagement.eyebrow}</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              {engagement.heading[0]}<br />
              <em style={{ color: 'var(--terracotta)' }}>{engagement.heading[1]}</em>
            </h2>
          </div>
          <p className="side lede rv" style={{ ['--rd' as string]: '120ms' }}>{engagement.copy}</p>
        </div>

        <div className="models">
          {engagement.models.map((m, i) => (
            <article
              className={`model rv ${'featured' in m && m.featured ? 'featured' : ''}`}
              key={m.n}
              style={{ ['--rd' as string]: `${i * 90}ms` }}
            >
              {'featured' in m && m.featured && <span className="flag lbl">Most chosen</span>}
              <p className="n" aria-hidden="true">{m.n}.</p>
              <h3>{m.name}</h3>
              <p className="line">{m.line}</p>
              <ul>
                {m.includes.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <div className="tail">
                <p className="fit">{m.fit}</p>
                <p className="from num">{m.from}</p>
                <a className="btn btn--sm" href="#contact">
                  Enquire <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
