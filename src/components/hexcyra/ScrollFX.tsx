'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/* ═══════════════════════════════════════════════════════════════════════════
   ScrollFX — the Trendy Attire scroll system, adapted for Next.js + Lenis.

   One requestAnimationFrame loop drives:
   · Lenis smooth scrolling
   · the reading-progress bar in the nav
   · [data-speed] parallax on any element
   · `.rv` reveals via IntersectionObserver
   · the `body.live` class that triggers the hero entrance
   · smooth anchor scrolling with the nav offset

   `prefers-reduced-motion` gets a quiet, complete page — no Lenis, no
   parallax, everything visible.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ScrollFX() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* — reveals (work even without motion) — */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));

    /* — hero entrance — */
    const live = requestAnimationFrame(() => document.body.classList.add('live'));

    if (reduced) {
      document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
        el.style.transform = 'none';
      });
      const prog = document.getElementById('prog');
      const onScroll = () => {
        if (!prog) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => {
        cancelAnimationFrame(live);
        io.disconnect();
        window.removeEventListener('scroll', onScroll);
      };
    }

    /* — Lenis + single rAF loop — */
    const lenis = new Lenis({ duration: 1.1, touchMultiplier: 1.4 });
    const prog = document.getElementById('prog');
    const para = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'));

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

      const vh = window.innerHeight;
      for (const el of para) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        const speed = parseFloat(el.dataset.speed || '0.1');
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* — smooth anchors with nav offset — */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74) - 12 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(live);
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('click', onClick);
      lenis.destroy();
      document.body.classList.remove('live');
    };
  }, []);

  return null;
}
