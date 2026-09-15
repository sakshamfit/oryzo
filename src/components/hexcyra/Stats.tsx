import { stats } from '@/config/site';

/* Proof band — maroon, serif figures, hairline dividers. */

export default function Stats() {
  return (
    <section className="stats on-maroon grain" aria-label="Studio in numbers">
      <div className="wrap g">
        {stats.map((s, i) => (
          <div className="it rv" key={s.label} style={{ ['--rd' as string]: `${i * 70}ms` }}>
            <b className="num">{s.value}</b>
            <small className="lbl">{s.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
