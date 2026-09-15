'use client';

import { useState } from 'react';
import { contact, site } from '@/config/site';

/* ═══════════════════════════════════════════════════════════════════════════
   Contact — the fitting room. Client-side form that composes a pre-filled
   email (works on any static host), budget-band selector at 44px targets,
   and the studio ledger beside it.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Contact() {
  const [band, setBand] = useState<string>('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service')}`,
      `Budget: ${band || '—'}`,
      '',
      String(data.get('brief') || ''),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry — ${data.get('company') || data.get('name')}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="sec contact on-maroon grain" id={contact.id} aria-label="Contact">
      <div className="halo" aria-hidden="true" />
      <div className="wrap">
        <div className="g">
          <div>
            <p className="overline rv">{contact.index} — {contact.eyebrow}</p>
            <h2 className="dsp-2 rv" style={{ ['--rd' as string]: '60ms' }}>
              {contact.heading[0]}<br />
              <em style={{ color: 'var(--terracotta)' }}>{contact.heading[1]}</em>
            </h2>
            <p className="copy lede rv" style={{ ['--rd' as string]: '120ms', marginBottom: 'clamp(20px,3vw,32px)' }}>
              {contact.copy}
            </p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="lbl" htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" required autoComplete="name" placeholder="Your name" />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="ct-company">Company</label>
                <input id="ct-company" name="company" autoComplete="organization" placeholder="Company / product" />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </div>
              <div className="field">
                <label className="lbl" htmlFor="ct-service">Service</label>
                <input id="ct-service" name="service" list="ct-services" placeholder="Web, app, SaaS…" />
                <datalist id="ct-services">
                  <option value="Web development" />
                  <option value="Mobile app" />
                  <option value="SaaS product" />
                  <option value="Custom software" />
                  <option value="UI/UX design" />
                  <option value="E-commerce" />
                  <option value="Cloud & DevOps" />
                  <option value="AI & data" />
                  <option value="Something else" />
                </datalist>
              </div>
              <div className="field field--full">
                <span className="lbl" id="ct-budget-l">Budget band</span>
                <div className="bands" role="group" aria-labelledby="ct-budget-l">
                  {contact.budgetBands.map((b) => (
                    <button
                      type="button"
                      key={b}
                      aria-pressed={band === b}
                      onClick={() => setBand((v) => (v === b ? '' : b))}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field field--full">
                <label className="lbl" htmlFor="ct-brief">The brief</label>
                <textarea id="ct-brief" name="brief" required placeholder="What are you building, and by when?" />
              </div>
              <button className="btn btn--lg" type="submit">
                Send the brief <span className="ar" aria-hidden="true">↗</span>
              </button>
              {sent && (
                <p role="status" className="lbl" style={{ gridColumn: '1 / -1', color: 'var(--terracotta)' }}>
                  Your mail client is opening with the brief pre-filled — press send there.
                </p>
              )}
            </form>
          </div>

          <div className="details rv">
            <dl>
              {contact.details.map((d) => (
                <div className="r" key={d.k}>
                  <dt className="lbl">{d.k}</dt>
                  <dd>
                    {'href' in d && d.href ? <a href={d.href}>{d.v}</a> : d.v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="note copy">
              Prefer writing? Email reaches a senior engineer directly — no
              ticket queues, no gatekeeping.
            </p>
            <a className="tlink" href={`mailto:${site.email}`}>
              {site.email} <span className="ar" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
