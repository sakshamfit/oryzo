'use client';

import { BRAND, CONTACT, FOOTER } from '@/config/projectData';
import { Reveal } from '@/components/ui/Reveal';
import { useSmoothScroll } from '@/components/ui/SmoothScroll';
import { ArrowUp, Mail, Phone, MapPinned } from 'lucide-react';

/**
 * Section 10 — the closing editorial plate: an oversized wordmark, the index,
 * contact placeholders and the small print.
 */
export function Footer() {
  const smooth = useSmoothScroll();
  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    smooth.toAnchor(href);
  };

  return (
    <footer id="contact" data-section="10" className="relative bg-obsidian text-ivory">
      <div className="mx-auto w-full max-w-[110rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(5rem,14vh,9rem)]">
        <div className="grid gap-[clamp(3rem,8vh,5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Wordmark + contact */}
          <div>
            <Reveal variant="line">
              <p className="font-sans text-[clamp(3rem,1.2rem+10vw,10rem)] leading-[0.9] font-extralight tracking-[-0.04em]">
                <span className="pp-line"><span data-line>{BRAND.line1.toUpperCase()}</span></span>
                <span className="pp-line"><span data-line className="font-serif italic text-gold">{BRAND.line2}</span></span>
              </p>
            </Reveal>

            <div className="mt-[clamp(2rem,5vh,3.5rem)] flex flex-col gap-3">
              <a href={CONTACT.phoneHref} className="group flex items-center gap-3 text-body-lg text-ivory/75 hover:text-gold">
                <Phone className="h-4 w-4 text-gold/70" strokeWidth={1.4} /> {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className="group flex items-center gap-3 text-body-lg text-ivory/75 hover:text-gold">
                <Mail className="h-4 w-4 text-gold/70" strokeWidth={1.4} /> {CONTACT.email}
              </a>
              <p className="flex items-start gap-3 text-body-lg text-ivory/55">
                <MapPinned className="mt-1 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.4} />
                <span>{CONTACT.address.join(', ')}</span>
              </p>
              <p className="pl-7 text-micro tracking-[0.18em] text-stone/50 uppercase">{CONTACT.hours}</p>
            </div>
          </div>

          {/* Index */}
          <div className="grid grid-cols-2 gap-8 self-end lg:justify-items-end">
            {FOOTER.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="pp-label mb-5 text-gold/70">{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={go(link.href)} className="pp-link text-body-lg text-ivory/70 hover:text-gold">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="pp-rule my-[clamp(2.5rem,6vh,4rem)]" />

        <div className="flex flex-col gap-4 pb-[clamp(2rem,5vh,3rem)] md:flex-row md:items-center md:justify-between">
          <p className="text-micro tracking-[0.16em] text-stone/45 uppercase">
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.registration}
          </p>
          <button
            type="button"
            onClick={go('#hero')}
            className="group flex items-center gap-2 pp-label text-ivory/60 hover:text-gold"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
          </button>
        </div>

        <div className="border-t border-ivory/8 py-6">
          <ul className="flex flex-col gap-1.5">
            {FOOTER.legal.map((line) => (
              <li key={line} className="text-micro leading-relaxed tracking-[0.06em] text-stone/35">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
