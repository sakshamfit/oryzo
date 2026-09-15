# A3 Interior Designer & Builder — Landing Page

> "Turn your dream home into reality." A single-page site for A3 Interior
> Designer & Builder — a leading architect and interior design practice in
> Gorakhpur, Uttar Pradesh (4.8★, 174 Google reviews).

Built with **Next.js 15 (App Router) · React 19 · TypeScript (strict) ·
Tailwind CSS v4 · Iconify (Solar icons)**. Fonts: **Inter Tight** (300–600)
with deliberate serif-italic accents (**Instrument Serif**).

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

Quality gates:

```bash
npm run typecheck  # tsc --noEmit (strict)
npm run build      # production build
```

---

## Design system ("AETHER" reference)

- Exact palette: body `#FDFBF9`, text `#1a1a1a`, dark sections `#111` / `#1a1a1a`.
- Selection color: `stone-800` background, white text.
- `font-feature-settings: "ss01", "ss04"` on Inter Tight.
- **Native scrolling only** — `scroll-smooth` on `<html>`. No Lenis or any
  smooth-scroll library; the only scroll lock is the open-menu state.
- Nav: `fixed z-50 mix-blend-difference` (white-on-dark / dark-on-light),
  `pointer-events-none` on the `<nav>` with `pointer-events-auto` on the inner
  div so it never blocks hero clicks.
- Hero: `h-[95vh]`, image `object-bottom opacity-70` + gradient overlay.
- Images: `grayscale-[30%]`/`grayscale-[20%]` at rest → full color on hover,
  with `scale-105` (projects, duration-1000) or `scale-[1.02]` (gallery).
- `.image-reveal` clip-path transition `1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
  triggered by an IntersectionObserver (`InView` component).

## Sections

1. **Nav** — blend-difference, logo "A3 Interiors", Projects link + hamburger → full-screen menu
2. **Hero** — "Dream homes, *sculpted* into reality." + Book a Free Consultation
3. **Philosophy** — sticky metrics column (4.8 rating, top rated, turnkey) + narrative + image reveal
4. **Featured Projects** — sticky header row with L/R arrows; Obsidian Loft, Garden Duplex, Culinary House
5. **Highlights** — dark `#1a1a1a` band: residential & commercial, honest materials, one contract
6. **Gallery** — "The Atmosphere" mosaic (tall / wide / standard tiles)
7. **Contact** — free-consultation form (composes a WhatsApp message — the listing's appointment channel), studio details, real Google reviews
8. **Footer** — stone-900, logo + copyright, Legal / Privacy / Credits

## Where everything lives

| File | Purpose |
| ---- | ------- |
| `src/config/site.ts` | **all content & business facts** — name, address, phone, WhatsApp, hours, rating, projects, reviews, copy. Edit here, not in components. |
| `app/globals.css` | Tailwind v4 import, theme tokens, reveal system, selection color |
| `app/layout.tsx` | fonts, Iconify script, metadata + JSON-LD (LocalBusiness) |
| `src/components/a3/*` | one component per section |
| `src/components/a3/InView.tsx` | IntersectionObserver reveal helper |

## Business facts (source: Google listing)

| Field | Value |
|---|---|
| Name | A3 Interior Designer & Builder |
| Address | Second Floor, Commercial Road, Azeet Plaza, Buddha Vihar, Taramandal, Gorakhpur, UP 273001 |
| Phone / WhatsApp | +91 94515 46780 |
| Hours | Open daily · closes 10 PM |
| Rating | 4.8 — 174 Google reviews |
| Services | Interior design, residential & commercial, modular kitchens, architecture, turnkey build |

Appointments run through **WhatsApp** (`wa.me/919451546780`) — the contact
form opens a pre-filled chat, so the page needs no backend.

---

Imagery currently points at the AETHER reference asset map (Unsplash +
Supabase). Swap the URLs in `src/config/site.ts` for A3's own project
photography as it lands.
