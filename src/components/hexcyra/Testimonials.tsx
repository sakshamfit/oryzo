import { testimonials } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Testimonials — serif pull-quotes on cream, gold rules on top.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Testimonials() {
  return (
    <section className="sec quotes grain" aria-label="Client words">
      <div className="wrap">
        <p className="overline rv">06 — Client Words</p>
        <div className="g">
          {testimonials.map((t, i) => (
            <figure className="quote rv" key={t.name} style={{ ['--rd' as string]: `${i * 100}ms` }}>
              <span className="mark" aria-hidden="true">“</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption className="lbl mut">
                {t.name} — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
