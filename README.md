# Hexcyra — Software, cut to measure.

> A single-page landing for a full-service software atelier: web platforms,
> mobile apps, SaaS products, custom software, cloud, AI and everything else
> in the IT sector — presented like couture, engineered like infrastructure.

Built with **Next.js 15 (App Router) · React 19 · TypeScript (strict) ·
Lenis · Lucide**.

The design merges two in-house systems:

- **Saree Ghar** — the couture design language: cream / ivory / terracotta /
  maroon palette, gold hairlines, Cormorant Garamond + Jost + Great Vibes
  typography, overlines with fading rules, script signatures, corner arcs.
- **Trendy Attire** — the responsive system: fluid `clamp()` tokens
  (`--gut`, `--pad-y`, `--nav-h`), the 44px-minimum touch-friendly button
  system, `.rv` scroll reveals driven by one rAF loop, sticky nav with
  hamburger drawer ≤ 900px, reading progress, marquee bands, and
  320 → 1440 responsiveness with `prefers-reduced-motion` respect.

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

## Where everything lives

| File | Purpose |
| ---- | ------- |
| `src/config/site.ts` | **all content** — services, process, work, engagement models, FAQ, contact details. Edit this file; components only compose it. |
| `app/globals.css` | the design system — tokens, button/touch system, nav + drawer, section styles, motion safety |
| `app/page.tsx` | chapter order of the landing page |
| `src/components/hexcyra/*` | one component per chapter (Announcement, Navbar, Hero, Stats, Manifesto, Services, Process, Work, Stack, Engagement, Testimonials, Faq, Contact, Footer) |
| `src/components/hexcyra/ScrollFX.tsx` | Lenis + single rAF loop + `.rv` reveals + `data-speed` parallax + reading progress + smooth anchors |
| `public/assets/hexcyra/*` | brand imagery (AI-generated placeholder art — replace with real work photography as it lands) |

### Chapters

`announcement · nav · hero · proof · 01 atelier · 02 services (12 disciplines) ·
03 process · 04 work · stack marquee · 05 engagement · 06 client words ·
07 faq · 08 contact · footer`

### The motion system

One `requestAnimationFrame` loop drives Lenis smooth scrolling, the nav
progress bar and `[data-speed]` parallax; an IntersectionObserver flips `.rv`
elements to `.in`; a `body.live` class triggers the staggered hero entrance
(pure CSS transitions). `prefers-reduced-motion` gets a quiet, complete page.

### Buttons & touch

Every interactive target meets the 44px minimum, scales with `clamp()`,
stacks full-width ≤ 640px, and gives tactile `:active` feedback —
`.btn` (+ `--ghost --sm --lg --block`), `.tlink`, `.burger`, budget bands,
FAQ rows.

---

## Deploying

Any Node host or static export target works. `npm run build && npm run start`
is the production path. The contact form composes a pre-filled email
(`mailto:`) so the page needs no backend to take briefs.
