'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { MENU_LINKS } from '@/config/navigation';
import { gsap, EASE, DURATION } from '@/lib/gsap';
import { cx } from '@/lib/utils';

export interface MobileMenuProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  onNavigate: (href: string) => (event: MouseEvent) => void;
}

/**
 * The compact burger + full-screen editorial index for small viewports.
 * The overlay staggers its links in with the same expo language as the site.
 */
export function MobileMenu({ open, onToggle, onNavigate }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /* Animate open / close. */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      timelineRef.current?.kill();

      const links = overlay.querySelectorAll('[data-menu-link]');

      if (open) {
        const tl = gsap.timeline();
        tl.set(overlay, { pointerEvents: 'auto', display: 'flex' })
          .fromTo(
            overlay,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: DURATION.base, ease: EASE.inOut },
          )
          .fromTo(
            links,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: DURATION.base, ease: EASE.out, stagger: 0.05 },
            '-=0.35',
          );
        timelineRef.current = tl;
      } else {
        const tl = gsap.timeline();
        tl.to(links, { yPercent: 110, opacity: 0, duration: DURATION.micro, ease: 'power2.in', stagger: 0.02 })
          .to(
            overlay,
            { clipPath: 'inset(0 0 100% 0)', duration: DURATION.short, ease: EASE.inOut, onComplete: () => {
              gsap.set(overlay, { pointerEvents: 'none', display: 'none' });
            } },
            '-=0.1',
          );
        timelineRef.current = tl;
      }
    }, overlay);

    return () => ctx.revert();
  }, [open]);

  /* Scroll lock + escape to close. */
  useEffect(() => {
    if (open) {
      document.body.dataset.scrollLocked = 'true';
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onToggle(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        delete document.body.dataset.scrollLocked;
      };
    }
    return undefined;
  }, [open, onToggle]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => onToggle(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="relative z-[92] flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
      >
        <span
          className={cx(
            'h-px w-6 bg-ivory transition-transform duration-500',
            open && 'translate-y-[4px] rotate-45',
          )}
        />
        <span
          className={cx(
            'h-px w-6 bg-ivory transition-transform duration-500',
            open && '-translate-y-[4px] -rotate-45',
          )}
        />
      </button>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className={cx(
          'fixed inset-0 z-[91] flex-col justify-between bg-obsidian px-[clamp(1.25rem,6vw,3rem)] pb-[clamp(2rem,8vh,4rem)] pt-[clamp(5.5rem,12vh,7rem)]',
          open ? 'flex' : 'hidden',
        )}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {MENU_LINKS.map((link) => (
            <span className="pp-line" key={link.href}>
              <a
                data-menu-link
                href={link.href}
                onClick={onNavigate(link.href)}
                tabIndex={open ? 0 : -1}
                className="group flex items-baseline gap-4 py-2"
              >
                <span className="pp-label text-gold/60">{link.index}</span>
                <span className="font-sans text-[clamp(1.75rem,6vw,2.6rem)] font-extralight tracking-[-0.02em] text-ivory transition-colors group-hover:text-gold">
                  {link.label}
                </span>
              </a>
            </span>
          ))}
        </nav>

        <div className="pp-rule my-6" />
        <div className="flex items-center justify-between">
          <p className="pp-label text-stone/50">Palm Paradise</p>
          <p className="pp-label text-stone/50">{String(MENU_LINKS.length).padStart(2, '0')} stops</p>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
