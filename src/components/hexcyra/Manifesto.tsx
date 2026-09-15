import { manifesto } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Manifesto — the "Atelier" chapter. Split editorial layout with parallax
   art, gold corner arc, fact ledger and the script signature.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Manifesto() {
  return (
    <section className="sec atelier grain" id={manifesto.id} aria-label="About the studio">
      <div className="wrap">
        <p className="overline rv">
          {manifesto.index} — {manifesto.eyebrow}
        </p>

        <div className="split">
          <figure className="media rv">
            <div className="ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={manifesto.art}
                alt="The Hexcyra studio practice — abstract textile-like layers in the brand palette"
                data-speed="0.07"
                loading="lazy"
              />
            </div>
            <span className="arc" aria-hidden="true" />
            <figcaption className="lbl">Fig. 01 — The practice</figcaption>
          </figure>

          <div className="copy">
            <h2 className="dsp-2 rv">
              {manifesto.heading[0]}<br />
              <em style={{ color: 'var(--terracotta)' }}>{manifesto.heading[1]}</em>
            </h2>
            {manifesto.copy.map((p, i) => (
              <p className="copy rv" key={i} style={{ ['--rd' as string]: `${i * 80}ms` }}>{p}</p>
            ))}

            <dl className="rv">
              {manifesto.points.map((row) => (
                <div className="r" key={row.k}>
                  <dt>{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>

            <p className="sig rv">
              <span className="script" aria-hidden="true">Hexcyra</span>
              <span className="lbl mut">{manifesto.signature}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
