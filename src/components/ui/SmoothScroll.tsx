'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useLenis } from '@/hooks/useLenis';
import { ANCHOR_OFFSET } from '@/config/navigation';
import { prefersReducedMotion } from '@/lib/gsap';

export interface SmoothScrollApi {
  /** Smooth-scroll to an element, selector or absolute offset. */
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  /** Scroll to an in-page anchor (`#residences`), with a locked-scroll guard. */
  toAnchor: (href: string) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useLenis();

  const scrollTo = useCallback((target: string | HTMLElement | number, offset = 0) => {
    const lenis = lenisRef.current;
    if (!lenis) {
      // No Lenis (reduced motion, or not yet mounted): fall back to native.
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else if (typeof target !== 'number') {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo({ top: target, behavior: 'auto' });
      }
      return;
    }

    lenis.scrollTo(target, {
      offset: offset + ANCHOR_OFFSET,
      duration: prefersReducedMotion() ? 0 : 1.6,
    });
  }, [lenisRef]);

  const toAnchor = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (!element) return;
      scrollTo(element as HTMLElement);
    },
    [scrollTo],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), [lenisRef]);
  const start = useCallback(() => lenisRef.current?.start(), [lenisRef]);

  const api = useMemo<SmoothScrollApi>(
    () => ({ scrollTo, toAnchor, stop, start }),
    [scrollTo, toAnchor, stop, start],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

/** Anchor scrolling that works whether or not Lenis is running. */
export function useSmoothScroll(): SmoothScrollApi {
  const context = useContext(SmoothScrollContext);
  if (context) return context;

  // Provider missing (unit tests, isolated stories): degrade to native scroll.
  return {
    scrollTo: (target) => {
      if (typeof target === 'string') document.querySelector(target)?.scrollIntoView();
    },
    toAnchor: (href) => document.querySelector(href)?.scrollIntoView(),
    stop: () => {},
    start: () => {},
  };
}
