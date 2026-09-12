'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

export interface LenisOptions {
  lerp?: number;
  duration?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  smoothWheel?: boolean;
}

const DEFAULTS: LenisOptions = {
  // Exponential smoothing — feels weighted without ever feeling laggy.
  lerp: 0.09,
  wheelMultiplier: 1,
  touchMultiplier: 1.6,
  smoothWheel: true,
};

/**
 * Owns a single Lenis instance and wires it to GSAP's ticker so ScrollTrigger
 * and the smooth scroller share one clock. Never instantiate Lenis twice.
 */
export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion means native scrolling: no inertia, no surprises.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ ...DEFAULTS, ...options });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Lenis already smooths; letting GSAP compensate would double-damp.
    gsap.ticker.lagSmoothing(0);

    // Anything that changes document height (fonts, images, the loader
    // unmounting) must be reflected before the next pin is measured.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    if (typeof document.fonts?.ready?.then === 'function') {
      void document.fonts.ready.then(refresh);
    }

    return () => {
      window.removeEventListener('resize', refresh);
      gsap.ticker.remove(raf);
      lenis.stop();
      lenis.destroy();
      lenisRef.current = null;
    };
    // Options are static call-site literals; re-creating Lenis on every render
    // would be a disaster, so they are intentionally not tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef;
}
