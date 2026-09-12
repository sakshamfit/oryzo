/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PALM PARADISE — project facts & editorial copy
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ⚠️  EVERY NUMBER IN THIS FILE IS A PLACEHOLDER.
 *
 * Nothing here is a factual claim about a real development. Replace the values
 * with the client's approved figures before publishing. Fields that are not yet
 * confirmed are marked `PLACEHOLDER` so a grep finds them instantly:
 *
 *     grep -rn "PLACEHOLDER" src/config/projectData.ts
 *
 * Asset paths live in `ASSETS` — components never build image URLs themselves.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ROOT = '/assets/palm-paradise';

export const ASSETS = {
  branding: {
    logo: `${ROOT}/branding/logo.svg`,
    monogram: `${ROOT}/branding/monogram.svg`,
  },
  sequence: `${ROOT}/sequence`,
  architecture: {
    hero: `${ROOT}/architecture/hero.jpg`,
    detail01: `${ROOT}/architecture/detail-01.jpg`,
    detail02: `${ROOT}/architecture/detail-02.jpg`,
    architecture01: `${ROOT}/architecture/architecture-01.jpg`,
    architecture02: `${ROOT}/architecture/architecture-02.jpg`,
    architecture03: `${ROOT}/architecture/architecture-03.jpg`,
  },
  residences: {
    residence01: `${ROOT}/residences/residence-01.jpg`,
    residence02: `${ROOT}/residences/residence-02.jpg`,
    residence03: `${ROOT}/residences/residence-03.jpg`,
  },
  lifestyle: {
    lifestyle01: `${ROOT}/lifestyle/lifestyle-01.jpg`,
    lifestyle02: `${ROOT}/lifestyle/lifestyle-02.jpg`,
    lifestyle03: `${ROOT}/lifestyle/lifestyle-03.jpg`,
    lifestyle04: `${ROOT}/lifestyle/lifestyle-04.jpg`,
  },
  gallery: [
    `${ROOT}/gallery/gallery-01.jpg`,
    `${ROOT}/gallery/gallery-02.jpg`,
    `${ROOT}/gallery/gallery-03.jpg`,
    `${ROOT}/gallery/gallery-04.jpg`,
    `${ROOT}/gallery/gallery-05.jpg`,
    `${ROOT}/gallery/gallery-06.jpg`,
  ],
  location: {
    map: `${ROOT}/location/map.jpg`,
  },
} as const;

/* ── Brand ─────────────────────────────────────────────────────────────────── */

export const BRAND = {
  name: 'Palm Paradise',
  line1: 'Palm',
  line2: 'Paradise',
  tagline: 'Luxury, Reimagined.',
  supporting: 'A new address for elevated living.',
  primaryCta: 'Explore Residences',
  secondaryCta: 'Discover Palm Paradise',
  /** PLACEHOLDER — replace with the real RERA / registration number. */
  registration: 'RERA No. XXXX-XXXX-XXXX',
} as const;

/* ── Contact ───────────────────────────────────────────────────────────────── */

export const CONTACT = {
  /** PLACEHOLDER — do not publish until the client supplies a real number. */
  phoneDisplay: '+91 XXXXX XXXXX',
  phoneHref: 'tel:+910000000000',
  /** PLACEHOLDER — example domain, not a live mailbox. */
  email: 'hello@palmparadise.example',
  emailHref: 'mailto:hello@palmparadise.example',
  /** PLACEHOLDER */
  address: ['Sales Gallery', 'Palm Paradise', 'Address Line', 'City — 000 000'],
  /** PLACEHOLDER */
  hours: 'By private appointment · 10:00 – 19:00',
} as const;

/* ── Section 01 · The Vision ───────────────────────────────────────────────── */

export const VISION = {
  label: '01 — The Vision',
  headline: ['A Different Kind', 'of Everyday.'],
  body: 'Palm Paradise brings together contemporary architecture, thoughtful planning and elevated everyday living in one carefully designed address.',
  pullQuote: 'Architecture is not what a building looks like. It is how a day feels inside it.',
  pillars: [
    {
      index: 'I',
      title: 'Considered Planning',
      body: 'Every residence is oriented for cross-ventilation, natural light and a view worth waking up to.',
    },
    {
      index: 'II',
      title: 'Quiet Materials',
      body: 'Stone, timber and lime-washed plaster — materials that age gracefully rather than date quickly.',
    },
    {
      index: 'III',
      title: 'Grounded Landscape',
      body: 'Mature palms and shaded courtyards hold the site together, keeping the streetscape cool.',
    },
  ],
} as const;

/* ── Section 02 · Architecture ─────────────────────────────────────────────── */

export const ARCHITECTURE = {
  label: '02 — Architecture',
  headline: ['Form Meets', 'Function.'],
  body: 'A disciplined grid, deep shading and generous voids. The envelope is designed around the sun path so the building does less and the resident enjoys more.',
  details: [
    {
      title: 'Deep Setbacks',
      body: 'Recessed terraces shield glazing from the afternoon sun and give every home an outdoor room.',
      image: ASSETS.architecture.detail01,
    },
    {
      title: 'Continuous Horizon',
      body: 'Ribbon balconies wrap the elevation, drawing one unbroken line across the façade.',
      image: ASSETS.architecture.detail02,
    },
  ],
  stats: [
    { value: '27', label: 'Storeys', note: 'PLACEHOLDER' },
    { value: '4.2', label: 'Metre ceilings', note: 'PLACEHOLDER' },
    { value: '360°', label: 'Corner outlook', note: 'PLACEHOLDER' },
  ],
} as const;

/* ── Section 03 · Residences ───────────────────────────────────────────────── */

export interface Residence {
  id: string;
  typology: string;
  name: string;
  /** PLACEHOLDER — indicative carpet area, replace with sanctioned figures. */
  area: string;
  /** PLACEHOLDER */
  configuration: string;
  description: string;
  image: string;
  alt: string;
  highlights: string[];
}

export const RESIDENCES: Residence[] = [
  {
    id: 'two-bhk',
    typology: '2 BHK',
    name: 'The Courtyard',
    area: '1,120 sq ft',
    configuration: '2 Bed · 2 Bath · Utility',
    description:
      'A compact plan that refuses to feel compact — a single continuous living volume opening onto a shaded balcony.',
    image: ASSETS.residences.residence01,
    alt: 'Two bedroom residence at Palm Paradise — placeholder interior composition',
    highlights: ['East-facing living', 'Full-height glazing', 'Concealed utility'],
  },
  {
    id: 'three-bhk',
    typology: '3 BHK',
    name: 'The Terrace',
    area: '1,640 sq ft',
    configuration: '3 Bed · 3 Bath · Study',
    description:
      'The family residence. A study that can close, a kitchen that can hide, and a terrace wide enough to dine on.',
    image: ASSETS.residences.residence02,
    alt: 'Three bedroom residence at Palm Paradise — placeholder interior composition',
    highlights: ['Corner aspect', 'Private study', 'Wrap-around terrace'],
  },
  {
    id: 'penthouse',
    typology: 'Penthouse',
    name: 'The Crown',
    area: '3,480 sq ft',
    configuration: '4 Bed · 5 Bath · Private Pool',
    description:
      'Four residences at the top of the tower. Double-height living, a private pool deck and the whole skyline to yourself.',
    image: ASSETS.residences.residence03,
    alt: 'Penthouse residence at Palm Paradise — placeholder interior composition',
    highlights: ['Double-height living', 'Private pool deck', 'Dedicated lobby lift'],
  },
];

/* ── Section 05 · Amenities ────────────────────────────────────────────────── */

export interface Amenity {
  label: string;
  title: string;
  body: string;
  /** Lucide icon name — resolved in the component, kept as data for easy edits. */
  icon: string;
}

export const AMENITIES: Amenity[] = [
  {
    label: '01',
    title: 'Swimming Pool',
    body: 'A 25-metre lap pool held in a shaded courtyard, with a separate shallow deck.',
    icon: 'waves',
  },
  {
    label: '02',
    title: 'Fitness Studio',
    body: 'Daylit strength and conditioning floor opening onto the garden terrace.',
    icon: 'dumbbell',
  },
  {
    label: '03',
    title: 'Landscaped Gardens',
    body: 'Layered planting, shaded walkways and quiet seating between the towers.',
    icon: 'trees',
  },
  {
    label: '04',
    title: "Children's Play Area",
    body: 'A soft-surface play garden kept in sightline from the clubhouse veranda.',
    icon: 'blocks',
  },
  {
    label: '05',
    title: 'Clubhouse',
    body: 'Lounge, library and private dining, arranged around a double-height atrium.',
    icon: 'armchair',
  },
  {
    label: '06',
    title: 'Rooftop Terrace',
    body: 'An open deck at the crown of the building, facing the evening light.',
    icon: 'mountain',
  },
  {
    label: '07',
    title: 'Security',
    body: 'Layered access control, 24/7 manned surveillance and a monitored perimeter.',
    icon: 'shield',
  },
  {
    label: '08',
    title: 'Parking',
    body: 'Basement parking with EV charging bays and separate visitor approach.',
    icon: 'car',
  },
];

/* ── Section 06 · Lifestyle ────────────────────────────────────────────────── */

export const RESIDENCES_META = {
  label: '03 — Residences',
  headline: ['Designed Around', 'Your Life.'],
  body: 'Three residence typologies, one conviction: a home should be measured in light, air and quiet — not only in square feet.',
} as const;

export const AMENITIES_META = {
  label: '04 — Amenities',
  headline: ['Everything You Need.', "Nothing You Don't."],
} as const;

export const GALLERY_META = {
  label: '07 — Gallery',
  headline: ['In Frames.'],
  body: 'A study of the spaces in between — arrival, elevation, and the quiet of the courtyard.',
} as const;

export const LIFESTYLE = {
  label: '05 — Lifestyle',
  panels: [
    {
      headline: 'Morning Light.',
      body: 'East-facing living rooms fill early, and the tower wakes slowly.',
      image: ASSETS.lifestyle.lifestyle01,
      alt: 'Morning light across a Palm Paradise residence — placeholder image',
      span: 'tall',
    },
    {
      headline: 'Quiet Evenings.',
      body: 'The courtyard dims, the pool holds the last of the sky.',
      image: ASSETS.lifestyle.lifestyle02,
      alt: 'Evening at the Palm Paradise courtyard pool — placeholder image',
      span: 'wide',
    },
    {
      headline: 'A Better Pace of Life.',
      body: 'Everything you need within the gate. Nothing that pulls you out of it.',
      image: ASSETS.lifestyle.lifestyle03,
      alt: 'Landscaped garden walkway at Palm Paradise — placeholder image',
      span: 'wide',
    },
    {
      headline: 'Room to Breathe.',
      body: 'Generous setbacks, deep balconies, and space between buildings.',
      image: ASSETS.lifestyle.lifestyle04,
      alt: 'Terrace outlook from a Palm Paradise residence — placeholder image',
      span: 'tall',
    },
  ],
} as const;

/* ── Section 07 · Location ─────────────────────────────────────────────────── */

export interface LocationPoint {
  label: string;
  /** PLACEHOLDER — indicative drive times, confirm against a real site survey. */
  distance: string;
  /** Percentage position on the map artwork (0–100). */
  position: { x: number; y: number };
}

export const LOCATION = {
  label: '06 — Location',
  headline: ['Connected to', 'Everything That Matters.'],
  body: 'Palm Paradise sits at the intersection of the city\u2019s two busiest corridors — close enough to everything, far enough from the noise. Distances below are placeholders pending a site survey.',
  points: [
    { label: 'Airport', distance: '22 min', position: { x: 82, y: 18 } },
    { label: 'Business District', distance: '11 min', position: { x: 63, y: 42 } },
    { label: 'Schools', distance: '6 min', position: { x: 31, y: 29 } },
    { label: 'Hospitals', distance: '9 min', position: { x: 22, y: 63 } },
    { label: 'Shopping', distance: '7 min', position: { x: 48, y: 74 } },
    { label: 'Entertainment', distance: '13 min', position: { x: 74, y: 66 } },
  ] satisfies LocationPoint[],
  mapAlt: 'Stylised map showing Palm Paradise relative to the airport, business district, schools, hospitals, shopping and entertainment — placeholder artwork',
} as const;

/* ── Section 08 · Gallery ──────────────────────────────────────────────────── */

export interface GalleryItem {
  src: string;
  caption: string;
  alt: string;
  /** Drives the editorial rhythm of the desktop rail. */
  ratio: 'portrait' | 'landscape' | 'square';
}

export const GALLERY: GalleryItem[] = [
  {
    src: ASSETS.gallery[0] as string,
    caption: 'Arrival Court',
    alt: 'Arrival court at Palm Paradise — placeholder image',
    ratio: 'portrait',
  },
  {
    src: ASSETS.gallery[1] as string,
    caption: 'Tower Elevation',
    alt: 'Tower elevation at dusk — placeholder image',
    ratio: 'landscape',
  },
  {
    src: ASSETS.gallery[2] as string,
    caption: 'Courtyard Pool',
    alt: 'Courtyard pool in shade — placeholder image',
    ratio: 'square',
  },
  {
    src: ASSETS.gallery[3] as string,
    caption: 'Residence Interior',
    alt: 'Residence interior with full-height glazing — placeholder image',
    ratio: 'portrait',
  },
  {
    src: ASSETS.gallery[4] as string,
    caption: 'Garden Walk',
    alt: 'Shaded garden walkway between towers — placeholder image',
    ratio: 'landscape',
  },
  {
    src: ASSETS.gallery[5] as string,
    caption: 'Rooftop Terrace',
    alt: 'Rooftop terrace at golden hour — placeholder image',
    ratio: 'portrait',
  },
];

/* ── Section 09 · Investment ───────────────────────────────────────────────── */

export interface Metric {
  label: string;
  value: string;
  note: string;
}

/** ⚠️ PLACEHOLDER METRICS — every value must be confirmed by the client. */
export const METRICS: Metric[] = [
  { label: 'Project Area', value: '4.2', note: 'Acres · PLACEHOLDER' },
  { label: 'Unit Count', value: '216', note: 'Residences · PLACEHOLDER' },
  { label: 'Green Space', value: '68', note: '% of site · PLACEHOLDER' },
  { label: 'Parking', value: '1.4', note: 'Bays per home · PLACEHOLDER' },
  { label: 'Possession', value: 'Q4', note: '2028 · PLACEHOLDER' },
];

export const INVESTMENT = {
  label: '08 — Investment',
  headline: ['More Than a Home.', 'A Long-Term Address.'],
  body: 'A limited release of residences in a location with limited supply. Figures shown are indicative placeholders and do not constitute an offer, projection or guarantee of value.',
  disclaimer:
    'All areas, counts and dates on this page are placeholders for design purposes only and should be replaced with approved project data before publication.',
} as const;

/* ── Section 10 · CTA ──────────────────────────────────────────────────────── */

export const CTA = {
  label: '09 — Enquire',
  headline: ['Your Next Chapter', 'Starts Here.'],
  body: 'Private viewings are held at the sales gallery by appointment. Share a few details and the team will be in touch.',
  primary: 'Book a Private Viewing',
  secondary: 'Download Brochure',
  /** PLACEHOLDER */
  footnote: 'Brochure PDF not yet available — placeholder action.',
} as const;

export const FOOTER = {
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Residences', href: '#residences' },
        { label: 'Amenities', href: '#amenities' },
        { label: 'Architecture', href: '#architecture' },
      ],
    },
    {
      title: 'Discover',
      links: [
        { label: 'Location', href: '#location' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  legal: [
    'All imagery on this site is placeholder artwork used for design development.',
    'Areas, counts and dates are indicative and subject to change without notice.',
  ],
} as const;
