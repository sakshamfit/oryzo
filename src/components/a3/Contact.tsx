'use client';

import InView from './InView';
import { contact, mapsDirections, mapsSearch, reviews, site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Contact — bg stone-100, 2-column grid. Underlined inputs (border-b, no
   labels except uppercase small text), custom select with an absolute
   alt-arrow-down icon, dark button with wide tracking. The form composes a
   WhatsApp message (the listing's appointment channel) — no backend needed.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      `Hi ${site.shortName} Interiors! I'd like a free design consultation.`,
      '',
      `Name: ${d.get('name')}`,
      `Phone: ${d.get('phone')}`,
      `Project: ${d.get('type')}`,
      d.get('message') ? `Brief: ${d.get('message')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-stone-100 text-[#1a1a1a]">
      <div className="grid grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        {/* left — pitch + details + reviews */}
        <InView>
          <p className="fade-reveal text-[11px] uppercase tracking-[0.3em] text-black/50">{contact.eyebrow}</p>
          <h2 className="fade-reveal mt-6 text-4xl font-medium leading-[1.02] tracking-tighter md:text-6xl" style={{ transitionDelay: '80ms' }}>
            {contact.heading1} <span className="font-serif font-light italic">{contact.italic}</span> {contact.heading2}
          </h2>
          <p className="fade-reveal mt-8 max-w-md text-[15px] leading-relaxed text-black/60" style={{ transitionDelay: '160ms' }}>
            {contact.copy}
          </p>

          <dl className="fade-reveal mt-12 space-y-5 border-t border-black/10 pt-8 text-sm" style={{ transitionDelay: '240ms' }}>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-black/40">Studio</dt>
              <dd className="mt-1 text-black/70">
                {site.address.line1}<br />
                {site.address.line2}<br />
                {site.address.city}, {site.address.state} {site.address.pin}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-black/40">Call / WhatsApp</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-black/70 underline-offset-4 transition-colors hover:text-black hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-black/40">Hours · Service area</dt>
              <dd className="mt-1 text-black/70">
                {site.hours} — {site.serviceArea}
              </dd>
            </div>
          </dl>

          <div className="fade-reveal mt-10 flex flex-wrap gap-3" style={{ transitionDelay: '320ms' }}>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 border border-black/15 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-500 hover:bg-[#F9F9F7]"
            >
              <iconify-icon icon="solar:chat-round-line-linear" aria-hidden="true" />
              WhatsApp us
            </a>
            <a
              href={mapsDirections}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 border border-black/15 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-500 hover:bg-[#F9F9F7]"
            >
              <iconify-icon icon="solar:map-point-linear" aria-hidden="true" />
              Directions
            </a>
          </div>

          {/* real Google reviews */}
          <div className="fade-reveal mt-14 border-t border-black/10 pt-8" style={{ transitionDelay: '400ms' }}>
            <a
              href={mapsSearch}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-black/50 transition-colors hover:text-black"
            >
              <iconify-icon icon="solar:star-bold" className="text-sm" aria-hidden="true" />
              {site.rating.value} on Google — {site.rating.count} reviews
            </a>
            <div className="mt-6 grid gap-6 sm:grid-cols-1">
              {reviews.map((r) => (
                <figure key={r.quote} className="border-l border-black/10 pl-5">
                  <blockquote className="font-serif text-lg italic leading-snug text-black/70">“{r.quote}”</blockquote>
                  <figcaption className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/40">{r.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </InView>

        {/* right — form */}
        <InView>
          <form onSubmit={onSubmit} className="fade-reveal flex flex-col gap-10 pt-2 md:pt-16">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-black/40">Your name</p>
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Full name"
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition-colors duration-500 placeholder:text-black/25 focus:border-black"
              />
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-black/40">Phone</p>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+91 ..."
                className="w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition-colors duration-500 placeholder:text-black/25 focus:border-black"
              />
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-black/40">Project type</p>
              <div className="relative">
                <select
                  name="type"
                  defaultValue={contact.projectTypes[0]}
                  className="w-full appearance-none border-b border-black/20 bg-transparent py-3 pr-8 text-sm outline-none transition-colors duration-500 focus:border-black"
                >
                  {contact.projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <iconify-icon
                  icon="solar:alt-arrow-down-linear"
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-black/40"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-black/40">Tell us about the space</p>
              <textarea
                name="message"
                rows={4}
                placeholder="Rooms, size, timeline, anything else…"
                className="w-full resize-none border-b border-black/20 bg-transparent py-3 text-sm outline-none transition-colors duration-500 placeholder:text-black/25 focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="self-start bg-[#1a1a1a] px-10 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-500 hover:bg-black"
            >
              {contact.submit}
            </button>

            <p className="text-xs leading-relaxed text-black/40">
              Submitting opens WhatsApp with your brief pre-filled — or call us directly at{' '}
              <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a>.
            </p>
          </form>
        </InView>
      </div>
    </section>
  );
}
