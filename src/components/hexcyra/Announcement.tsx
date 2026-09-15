import { services } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Announcement — terracotta marquee band above the nav (Trendy Attire
   pattern), carrying the service catalogue.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Announcement() {
  const items = services.map((s) => s.title);
  const track = [...items, ...items];
  return (
    <div className="ann lbl" role="marquee" aria-label="What we do">
      <div className="track" aria-hidden="true">
        {[0, 1].map((half) => (
          <div className="grp" key={half}>
            {track.map((t, i) => (
              <span className="it" key={`${half}-${i}`}>
                <span>{t}</span>
                <span className="sl num">{String((i % 12) + 1).padStart(2, '0')}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{items.join(' · ')}</p>
    </div>
  );
}
