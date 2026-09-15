import { work } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Work — selected projects on cream. Staggered second column, hover zoom,
   serif captions with hairline under.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Work() {
  return (
    <section className="sec grain" id="work" aria-label="Selected work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="overline rv">04 — Selected Work</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              Cut &amp; shipped.
            </h2>
          </div>
          <p className="side lede rv" style={{ ['--rd' as string]: '120ms' }}>
            A few pieces from the rails — each one in production, each one
            maintained by the team that made it.
          </p>
        </div>

        <div className="work-grid">
          {work.map((p, i) => (
            <article className="work-card rv" key={p.n} style={{ ['--rd' as string]: `${(i % 2) * 100}ms` }}>
              <figure className="shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={`${p.client} — ${p.title}`} loading="lazy" />
                <span className="ix lbl num">{p.n}</span>
              </figure>
              <div className="cap">
                <h3>{p.client}</h3>
                <span className="yr lbl num">{p.year}</span>
              </div>
              <p className="sub lbl">
                <span>{p.title}</span>
                <span>{p.kind}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
