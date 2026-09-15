import { Plus } from 'lucide-react';
import { faq } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ — native <details> accordion: accessible by default, 44px+ rows,
   rotating plus glyph. No JavaScript needed.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Faq() {
  return (
    <section className="sec faq grain" id="faq" aria-label="Frequently asked questions">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="overline rv">07 — Fittings &amp; Answers</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              Before you ask.
            </h2>
          </div>
          <p className="side lede rv" style={{ ['--rd' as string]: '120ms' }}>
            The questions every client asks in the first call — answered here,
            plainly.
          </p>
        </div>

        {faq.map((f, i) => (
          <details className="rv" key={f.q} style={{ ['--rd' as string]: `${(i % 3) * 60}ms` }} open={i === 0}>
            <summary>
              {f.q}
              <span className="pm" aria-hidden="true"><Plus size={16} /></span>
            </summary>
            <p className="a copy">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
