'use client';

import { useMediaQuery, MEDIA } from '@/hooks/useMediaQuery';

/**
 * Tracks the OS "reduce motion" setting.
 *
 * Everything decorative in this site checks it: the frame scrub becomes a
 * static image, Lenis is never instantiated, GSAP reveals resolve instantly.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(MEDIA.reducedMotion);
}
