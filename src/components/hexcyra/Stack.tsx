import { stack } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Stack — serif tech marquee on maroon, edge-faded, pauses on hover.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Stack() {
  const items = [...stack, ...stack];
  return (
    <section className="stackband on-maroon grain" aria-label="Technology stack">
      <div className="mq" aria-hidden="true">
        <div className="track">
          {items.map((t, i) => (
            <span className="grp" key={`${t}-${i}`}>
              <span>{t}</span>
              <i />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Technologies we work with: {stack.join(', ')}.</p>
    </section>
  );
}
