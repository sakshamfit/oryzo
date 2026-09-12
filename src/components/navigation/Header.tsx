'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS, NAV_ENQUIRE } from '@/config/navigation';
import { BRAND } from '@/config/projectData';
import { cx } from '@/lib/utils';
import { useSmoothScroll } from '@/components/ui/SmoothScroll';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from '@/components/navigation/MobileMenu';

/**
 * Floating, minimal navigation. Transparent over the hero; condenses into a
 * refined dark glass once the film gives way to content.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const smooth = useSmoothScroll();

  useEffect(() => {
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        setScrolled(window.scrollY > 32);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    smooth.toAnchor(href);
  };

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
          scrolled
            ? 'border-b border-ivory/8 bg-obsidian/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[clamp(3.5rem,8vh,4.5rem)] w-full max-w-[110rem] items-center justify-between px-[clamp(1.25rem,4vw,3rem)]">
          <a
            href="#hero"
            onClick={go('#hero')}
            className="group flex flex-col leading-none"
            aria-label={`${BRAND.name} — back to top`}
          >
            <span className="font-sans text-[0.7rem] font-semibold tracking-[0.4em] text-ivory transition-colors group-hover:text-gold">
              {BRAND.line1.toUpperCase()}
            </span>
            <span className="font-serif text-[0.9rem] italic tracking-[0.18em] text-gold">
              {BRAND.line2}
            </span>
          </a>

          <nav className="hidden items-center gap-[clamp(1.25rem,2.5vw,2.5rem)] lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={go(link.href)}
                className="pp-label text-ivory/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <Button href={NAV_ENQUIRE.href} onClick={go(NAV_ENQUIRE.href)} variant="outline" arrow="none" magnetic={false} className="!py-2">
              {NAV_ENQUIRE.label}
            </Button>
          </nav>

          <MobileMenu open={menuOpen} onToggle={setMenuOpen} onNavigate={go} />
        </div>
      </header>
    </>
  );
}

export default Header;
