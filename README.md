# Palm Paradise — Elevated Living

> An architectural film that happens to be a website.

Palm Paradise is a cinematic single-page experience for a premium residential
development. The hero is a **30-frame, scroll-scrubbed architectural sequence**
rendered to a DPR-aware `<canvas>` — the scroll position drives the camera from a
distant approach, through the landscaping and façade, to a final aerial reveal.
Everything else (vision, residences, architecture, amenities, lifestyle, location,
gallery, investment, contact) is composed as quiet, editorial chapters around that
film.

Built with **Next.js (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Lenis · Three.js (@react-three/fiber) · Lucide**.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Quality gates (what CI should run):

```bash
npm run typecheck  # tsc --noEmit (strict)
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run build      # production build
```

---

## The frame-sequence workflow (read this first)

The hero never hardcodes external URLs. It reads a **central config** and a **fixed
folder of 30 JPGs** that you simply overwrite.

### 1. Ship the real footage

1. Generate / film your Palm Paradise video.
2. Split it into 30 stills (EZGIF, ffmpeg, Premiere…).
3. Name them, in order: `frame-001.jpg` … `frame-030.jpg`.
4. Drop them into `public/assets/palm-paradise/sequence/`, overwriting the placeholders.
5. Done — the site uses them on the next load. **No code changes.**

Optional portrait set for phones: put the same 30 names in
`public/assets/palm-paradise/mobile/`. The player probes `frame-001` at runtime and
uses the portrait set when present; delete the folder to fall back to landscape.

If your film has a different frame count, change `totalFrames` in
`src/config/palmSequence.ts` — nothing else hardcodes 30.

### 2. Placeholder art

The files currently in `public/assets/palm-paradise/**` are **generated placeholder
art** (abstract composition studies, not AI renders). Regenerate or tweak them with:

```bash
npm run assets:generate
```

See `scripts/generate-placeholders.mjs`. Safe to delete once real photography lands.

### 3. Where everything is configured

| File | Purpose |
| ---- | ------- |
| `src/config/palmSequence.ts` | frame paths, count, DPR cap, focal points, scroll length, damping, debug flag |
| `src/config/projectData.ts` | every fact, figure, and asset path (all marked `PLACEHOLDER`) |
| `src/config/navigation.ts` | nav links + the 01–10 section index |

Components never build image URLs themselves — they read `ASSETS` from
`projectData.ts`.

---

## Debug overlay

Set in `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SEQUENCE_DEBUG=true
```

Shows a corner readout (`FRAME 17 / 30 · PROGRESS 56% · decoded n/30`). When `false`
(the default) the component is never mounted.

---

## Architecture notes

- **Scroll → ref → rAF, never React.** `ScrollTrigger.onUpdate` writes one number to a
  ref; a `requestAnimationFrame` loop in `SequenceCanvas` damps and blends frames onto
  the canvas. No `setState` per frame, no 30×/s renders.
- **Continuity in three layers:** GSAP `scrub` (chases the scrollbar), frame-rate
  independent damping (flicks glide), and fractional cross-dissolve (30 stills read as
  one camera move).
- **Memory-safe preloading:** frames decode via `createImageBitmap` and are downscaled
  to `maxTextureWidth` (1920 desktop / 900 mobile) so 30 frames don't eat GPU memory.
  Missing frames blend to their nearest neighbour; a fully missing set renders a
  procedural fallback scene instead of a black hero.
- **Reduced motion:** the scrub is replaced by a single static frame, Lenis is never
  instantiated, and reveals resolve instantly.
- **Performance:** Three.js is code-split and only mounts in the CTA; non-critical
  images are lazy; the first frames are `<link rel="preload">`ed; the render loop
  pauses on hidden tabs; the canvas caps its backing store at 2600px.

### Structure

```
src/
  app/            layout (fonts, SEO, providers) + page
  components/
    cinematic/    CinematicSequence · SequenceCanvas · SequenceLoader · SequenceDebug
    navigation/   Header · MobileMenu
    hero/         Hero
    sections/     Vision · Architecture · Residences · Amenities · Lifestyle · Investment · CallToAction
    gallery/      Gallery · Lightbox
    location/     LocationSection
    footer/       Footer
    three/        Atmosphere (R3F particle depth)
    ui/           Button · Magnetic · Reveal · SectionHeading · ImageFrame · CustomCursor · ScrollProgress · SmoothScroll
  config/         palmSequence · projectData · navigation
  hooks/          useImageSequence · useLenis · useMediaQuery · useReducedMotion
  lib/            gsap · utils · types
  styles/         globals.css (design tokens, fluid type scale)
scripts/          generate-placeholders.mjs
public/assets/    palm-paradise/** (replaceable placeholder art)
```

---

## Accessibility & responsiveness

Semantic landmarks, skip-link, visible focus states, ARIA labels, keyboard gallery
navigation (←/→/Esc), and a screen-reader account of the hero film. Fluid `clamp()`
type from 360px to 1440p+, no horizontal overflow, and `prefers-reduced-motion`
support throughout.

## Disclaimer

All figures (areas, counts, dates, contacts) are **placeholders** for design
development, flagged `PLACEHOLDER` in `src/config/projectData.ts`. Replace them with
approved project data before publication.
