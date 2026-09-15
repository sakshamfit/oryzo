/* ═══════════════════════════════════════════════════════════════════════════
   A3 INTERIOR DESIGNER & BUILDER — site content
   Business facts sourced from the Google listing. Edit here, not in components.
   ═══════════════════════════════════════════════════════════════════════════ */

export const site = {
  name: 'A3 Interior Designer & Builder',
  shortName: 'A3',
  logoSpan: 'Interiors',
  tagline: 'Turn your dream home into reality.',
  description:
    'A3 Interior Designer & Builder is a leading architect and top interior designer in Gorakhpur, Uttar Pradesh — residential and commercial interiors, modular kitchens and turnkey design-and-build.',
  url: 'https://a3interiors.in',
  phone: '+91 94515 46780',
  phoneHref: 'tel:+919451546780',
  whatsapp: 'https://wa.me/919451546780',
  whatsappNumber: '919451546780',
  address: {
    line1: 'Second Floor, Commercial Road',
    line2: 'Azeet Plaza, Buddha Vihar, Taramandal',
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
    pin: '273001',
  },
  addressFull:
    'Second Floor, Commercial Road, Azeet Plaza, Buddha Vihar, Taramandal, Gorakhpur, Uttar Pradesh 273001',
  hours: 'Open daily · Closes 10 PM',
  hoursSchema: 'Mo-Su 10:00-22:00',
  serviceArea: 'Gorakhpur & nearby cities',
  rating: { value: '4.8', count: 174 },
} as const;

export const mapsSearch =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('A3 Interior Designer & Builder, Azeet Plaza, Taramandal, Gorakhpur, Uttar Pradesh 273001');
export const mapsDirections =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('A3 Interior Designer & Builder, Azeet Plaza, Taramandal, Gorakhpur, Uttar Pradesh 273001');

/* — asset map (AETHER reference) — */
export const assets = {
  hero: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop',
  philosophy: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
  obsidianLoft: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2700&auto=format&fit=crop',
  gardenDuplex: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop',
  culinary: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop',
  gallery1: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
  gallery2: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop',
  gallery3: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
  gallery4: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
} as const;

/* — hero — */
export const hero = {
  eyebrow: 'Interior Designer & Builder — Gorakhpur, Uttar Pradesh',
  line1: 'Dream homes,',
  italic: 'sculpted',
  line2: 'into reality.',
  copy:
    'A3 is a leading interior design and architecture practice in Gorakhpur — residential and commercial spaces designed, built and finished under one roof.',
  cta: 'Book a Free Consultation',
  ctaHref: '#contact',
} as const;

/* — philosophy metrics (sticky column) — */
export const metrics = [
  { icon: 'solar:cup-star-linear', value: '4.8 / 5', label: 'Google rating — 174 reviews' },
  { icon: 'solar:medal-ribbon-linear', value: 'Top rated', label: 'Among Gorakhpur’s leading interior designers' },
  { icon: 'solar:shield-check-linear', value: 'Turnkey', label: 'Design + build under one contract' },
] as const;

export const philosophy = {
  eyebrow: 'Philosophy',
  heading1: 'A new way of',
  italic: 'furnishing',
  heading2: '.',
  copy: [
    'A3 Interior Designer & Builder works with a single aim — creating a new way of furnishing. As architects and interior designers in Gorakhpur, we take a space from the first sketch to the final switch plate, so nothing is lost between the drawing and the home.',
    'Residential or commercial, a single room or a full turnkey build — every project is measured twice, detailed honestly, and finished by hand.',
  ],
  imageCaption: 'Residence — Gorakhpur',
} as const;

/* — featured projects — */
export type Project = {
  name: string;
  location: string;
  desc: string;
  area: string;
  type: string;
  price: string;
  img: string;
};

export const projects: readonly Project[] = [
  {
    name: 'Obsidian Loft',
    location: 'Gorakhpur · Full-home interior',
    desc: 'A complete ground-up interior — kitchen, living and bedrooms held in a deep, quiet palette with warm brass accents.',
    area: '2,400 sq ft',
    type: '3 BHK',
    price: 'Turnkey',
    img: assets.obsidianLoft,
  },
  {
    name: 'Garden Duplex',
    location: 'Gorakhpur · Duplex residence',
    desc: 'A light-washed duplex planned around its courtyard — open living, layered greens and rooms that breathe.',
    area: '3,100 sq ft',
    type: '4 BHK',
    price: 'Design + Build',
    img: assets.gardenDuplex,
  },
  {
    name: 'Culinary House',
    location: 'Gorakhpur · Modular kitchen',
    desc: 'A kitchen designed around the cook — storage that disappears, counters at the right height, light where it matters.',
    area: 'Modular kitchen',
    type: 'Custom',
    price: 'Free consult',
    img: assets.culinary,
  },
] as const;

/* — highlights (dark section) — */
export const highlights = [
  {
    icon: 'solar:city-linear',
    title: 'Residential & Commercial',
    desc: 'Homes, shops, offices and clinics — designed with the same care, built to the same standard.',
  },
  {
    icon: 'solar:leaf-linear',
    title: 'Honest Materials',
    desc: 'Finishes chosen for how they age, not just how they photograph — sourced and finished locally.',
  },
  {
    icon: 'solar:lock-keyhole-linear',
    title: 'One Contract, Zero Surprises',
    desc: 'Turnkey design-and-build with a fixed scope, clear timelines and post-handover support.',
  },
] as const;

/* — gallery — */
export const gallery = {
  eyebrow: 'Visuals',
  heading: 'The Atmosphere',
  items: [
    { img: assets.gallery1, alt: 'Interior detail — living space' },
    { img: assets.gallery2, alt: 'Interior detail — lounge' },
    { img: assets.gallery3, alt: 'Interior detail — material study' },
    { img: assets.gallery4, alt: 'Interior detail — bedroom' },
  ],
} as const;

/* — reviews (real Google reviews) — */
export const reviews = [
  { quote: 'Good looking for my design in my home — very nice work. Thank you!', author: 'Google review' },
  { quote: 'We absolutely loved the service from A3 Interior Designer & Builders.', author: 'Google review' },
  { quote: 'He provides interior designing service in Gorakhpur, and nearby city.', author: 'Google review' },
] as const;

/* — contact — */
export const contact = {
  eyebrow: 'Contact',
  heading1: 'Claim your',
  italic: 'free',
  heading2: 'design consultation.',
  copy:
    'Ready to transform your space? Whether it’s one room, a kitchen, or the whole home — tell us what you’re dreaming of and we’ll call you back.',
  projectTypes: [
    'Full-home interior',
    'Modular kitchen',
    'Commercial space',
    'Duplex / villa',
    'Renovation',
    'Something else',
  ],
  submit: 'Request a Callback',
} as const;

/* — menu — */
export const menuLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Projects', href: '#projects' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;
