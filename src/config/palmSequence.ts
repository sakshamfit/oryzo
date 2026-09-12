/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PALM PARADISE — cinematic frame sequence configuration
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * THIS IS THE ONLY PLACE FRAME PATHS ARE DEFINED.
 *
 * ── HOW TO SHIP THE REAL FOOTAGE ─────────────────────────────────────────────
 *  1. Render / generate the Palm Paradise film.
 *  2. Split it into 30 stills (EZGIF, ffmpeg -vf "select=..." , Premiere, …).
 *  3. Name them, in order:
 *
 *        frame-001.jpg  frame-002.jpg  …  frame-030.jpg
 *
 *  4. Drop them into  /public/assets/palm-paradise/sequence/  (overwrite).
 *  5. Done. No code changes, no rebuild step, no manifest to update.
 *
 * Optional — portrait re-framing for phones:
 *    Drop the same 30 names into /public/assets/palm-paradise/mobile/ and the
 *    player auto-detects the folder at runtime (it probes frame-001) and uses
 *    it. Delete the folder and it silently falls back to the desktop set.
 *
 * If you export a different frame count, change `totalFrames` below — nothing
 * else in the codebase hardcodes 30.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SequenceVariant = 'desktop' | 'mobile';

export interface FocalPoint {
  /** Horizontal anchor of the composition, 0 = left edge, 1 = right edge. */
  x: number;
  /** Vertical anchor of the composition, 0 = top edge, 1 = bottom edge. */
  y: number;
}

export interface VariantProfile {
  variant: SequenceVariant;
  folder: string;
  /**
   * Frames are decoded straight to GPU-friendly bitmaps and downscaled to this
   * width (aspect preserved) when they are larger. This is the single most
   * important memory lever: 30 frames at 4K ≈ 1.5 GB of texture memory, at
   * 1920px ≈ 250 MB. Never disable it on mobile.
   */
  maxTextureWidth: number;
  /** Where the "subject" of the composition sits, per breakpoint. */
  focal: FocalPoint;
  /**
   * Pinned scroll distance the sequence is scrubbed across, in viewport
   * heights. Using vh (rather than a fixed pixel count) keeps the film the
   * same number of "screens" long on a phone as on a 27" display.
   */
  scrollLengthVh: number;
}

export const PALM_SEQUENCE = {
  namespace: 'palm-paradise',

  /** Base folder — kept for tooling / documentation. */
  folder: '/assets/palm-paradise/sequence',
  /** Optional portrait set. Presence is detected at runtime. */
  mobileFolder: '/assets/palm-paradise/mobile',

  totalFrames: 30,
  firstFrame: 1,

  /** frame-001.jpg … frame-030.jpg */
  filePattern: (index: number): string =>
    `/assets/palm-paradise/sequence/frame-${String(index).padStart(3, '0')}.jpg`,

  /** Same pattern, portrait set. */
  mobileFilePattern: (index: number): string =>
    `/assets/palm-paradise/mobile/frame-${String(index).padStart(3, '0')}.jpg`,

  /** Frames decoded before the loader releases the site (rest stream in). */
  criticalFrames: 6,

  /** Concurrent network requests while preloading. */
  concurrency: 5,

  variants: {
    desktop: {
      variant: 'desktop',
      folder: '/assets/palm-paradise/sequence',
      maxTextureWidth: 1920,
      focal: { x: 0.62, y: 0.5 },
      scrollLengthVh: 4.6,
    },
    mobile: {
      variant: 'mobile',
      folder: '/assets/palm-paradise/mobile',
      maxTextureWidth: 900,
      focal: { x: 0.5, y: 0.46 },
      scrollLengthVh: 3.2,
    },
  } satisfies Record<SequenceVariant, VariantProfile>,

  /**
   * GSAP `scrub` value for the pinned trigger. Higher = more inertia behind
   * the scroll. `true` would be 1:1 and feel mechanical.
   */
  scrub: 0.9,

  /**
   * Frame-rate independent damping applied on top of GSAP's scrub, so a fast
   * flick still glides through the frames instead of strobing.
   * Higher = snappier, lower = floatier.
   */
  damping: 9,

  /**
   * Slow push-in across the whole sequence (1 → 1.035) so the still frames
   * read as one continuous camera move rather than a flipbook.
   */
  cameraPush: { from: 1, to: 1.035 },

  /** Cap for devicePixelRatio when sizing the backing store (2 = retina). */
  maxDpr: 2,

  /** Static frame used when the visitor prefers reduced motion. */
  posterFrame: 1,

  /**
   * Crossfade window between two adjacent frames, as a fraction of one frame.
   * 1 = always blend with the neighbour (smoothest); 0 = hard cut.
   */
  blendWindow: 1,
} as const;

export const TOTAL_FRAMES = PALM_SEQUENCE.totalFrames;
export const LAST_FRAME_INDEX = PALM_SEQUENCE.totalFrames - 1;

/** True when the developer has opted into the corner debug readout. */
export const SEQUENCE_DEBUG =
  process.env.NEXT_PUBLIC_SEQUENCE_DEBUG === 'true';

export function getVariantProfile(variant: SequenceVariant): VariantProfile {
  return variant === 'mobile' ? PALM_SEQUENCE.variants.mobile : PALM_SEQUENCE.variants.desktop;
}
