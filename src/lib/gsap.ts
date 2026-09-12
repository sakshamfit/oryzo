import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP is registered exactly once, module scope, on both server and client.
 * Importing this module is all a component needs — never call
 * `gsap.registerPlugin` inside a component body.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

gsap.defaults({ ease: 'none' });

/** Shared, named eases so motion language stays consistent site-wide. */
export const EASE = {
  /** Expensive, decelerating — the default for anything entering. */
  out: 'expo.out',
  outSoft: 'power3.out',
  outQuart: 'power4.out',
  inOut: 'power2.inOut',
  /** Frame sequencing must stay linear; anything else reads as stutter. */
  linear: 'none',
} as const;

/** Standard durations, in seconds. */
export const DURATION = {
  micro: 0.35,
  short: 0.6,
  base: 0.9,
  long: 1.4,
  cinematic: 2,
} as const;

export { gsap, ScrollTrigger };

/**
 * True when the visitor asked the OS to reduce motion. Safe to call during
 * render on the client; always false on the server so markup stays identical.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
