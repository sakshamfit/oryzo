'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe `matchMedia`. Returns `false` during server render and the first
 * client pass so markup always hydrates identically, then tracks the query.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const MEDIA = {
  /** Below this we look for the portrait frame set. */
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  /** Real pointer = custom cursor is welcome. Coarse = leave it alone. */
  finePointer: '(pointer: fine) and (hover: hover)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;
