import { process } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Process — six numbered steps on ivory, separated by hairlines.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Process() {
  return (
    <section className="sec process grain" id={process.id} aria-label="How we work">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="overline rv">{process.index} — {process.eyebrow}</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              {process.heading[0]}<br />
              <em style={{ color: 'var(--terracotta)' }}>{process.heading[1]}</em>
            </h2>
          </div>
          <p className="side lede rv" style={{ ['--rd' as string]: '120ms' }}>{process.copy}</p>
        </div>

        <div className="steps">
          {process.steps.map((s, i) => (
            <div className="step rv" key={s.n} style={{ ['--rd' as string]: `${(i % 3) * 90}ms` }}>
              <p className="n lbl num">{s.n}</p>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <p className="tail rule" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
