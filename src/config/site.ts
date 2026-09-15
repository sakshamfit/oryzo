/* ═══════════════════════════════════════════════════════════════════════════
   HEXCYRA — site content
   Every fact, service and figure on the landing page lives here.
   Edit this file; the components only compose it.
   ═══════════════════════════════════════════════════════════════════════════ */

export const site = {
  name: 'Hexcyra',
  tagline: 'Software, cut to measure.',
  script: 'hexcyra', // Great Vibes script signature
  description:
    'Hexcyra is a full-stack software atelier — web platforms, mobile apps, SaaS products and custom systems, engineered end to end.',
  url: 'https://hexcyra.com',
  email: 'hello@hexcyra.com',
  phone: '+91 90000 00000',
  phoneHref: 'tel:+919000000000',
  hours: 'MON — SAT · 10:00 — 19:00 IST',
  location: 'Remote-first · India',
  founded: 2026,
} as const;

/* — navigation — */
export const nav = [
  { label: 'Atelier', href: '#atelier' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Engagement', href: '#engagement' },
  { label: 'Contact', href: '#contact' },
] as const;

/* — hero — */
export const hero = {
  overline: 'Software Atelier — Web · Apps · SaaS · Systems',
  display: ['Build', 'the thing', 'properly.'],
  lede: 'A full-stack technology studio. Strategy, design, engineering and operations — one team, measure twice, ship once.',
  ctaPrimary: { label: 'Start a project', href: '#contact' },
  ctaSecondary: { label: 'See the services', href: '#services' },
  meta: ['Web platforms', 'Mobile apps', 'SaaS products', 'Custom software'],
  art: '/assets/hexcyra/hero.jpg',
} as const;

/* — proof bar — */
export const stats = [
  { value: '40+', label: 'Products shipped' },
  { value: '12', label: 'Countries served' },
  { value: '98%', label: 'Client retention' },
  { value: '24/7', label: 'Support cover' },
] as const;

/* — manifesto / about — */
export const manifesto = {
  index: '01',
  id: 'atelier',
  eyebrow: 'The Atelier',
  heading: ['Software with a', 'finishing touch.'],
  copy: [
    'Most software is cut from a template. Ours is drafted — to your business, your customers, your roadmap. Hexcyra covers the entire IT wardrobe: the storefront, the app in every pocket, the platform behind it and the systems that keep it running.',
    'One senior team carries your product from first sketch to production, then stays on as it scales. No hand-offs between vendors. No lost context. No unravelled seams.',
  ],
  points: [
    { k: 'Founded', v: '2026 — studio practice' },
    { k: 'Practice', v: 'Product · Design · Engineering' },
    { k: 'Team shape', v: 'Senior pods of 3–6' },
    { k: 'Delivery', v: 'Two-week cadence, always demoable' },
  ],
  signature: 'Hexcyra — software, cut to measure.',
  art: '/assets/hexcyra/atelier.jpg',
} as const;

/* — services catalogue — */
export type Service = {
  n: string;
  title: string;
  line: string;
  tags: readonly string[];
};

export const services: readonly Service[] = [
  {
    n: '01',
    title: 'Web Development',
    line: 'Marketing sites, portals and web platforms — fast, accessible, built to convert.',
    tags: ['Next.js', 'React', 'Node', 'Headless CMS', 'SEO'],
  },
  {
    n: '02',
    title: 'Mobile App Development',
    line: 'Native-feel apps for iOS and Android from a single, disciplined codebase.',
    tags: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'App Store ops'],
  },
  {
    n: '03',
    title: 'SaaS Product Engineering',
    line: 'Multi-tenant products end to end — billing, auth, analytics, onboarding.',
    tags: ['Architecture', 'Stripe', 'RBAC', 'Usage billing', 'Telemetry'],
  },
  {
    n: '04',
    title: 'Custom Software',
    line: 'ERPs, CRMs, internal tools and integrations shaped exactly to your operation.',
    tags: ['Node', 'Python', 'Postgres', 'APIs', 'Legacy rescue'],
  },
  {
    n: '05',
    title: 'UI / UX Design',
    line: 'Research-led product design — flows, systems and interfaces people finish.',
    tags: ['Design systems', 'Prototyping', 'Audits', 'Figma'],
  },
  {
    n: '06',
    title: 'E-commerce Engineering',
    line: 'Storefronts and commerce back-ends tuned for speed, scale and conversion.',
    tags: ['Shopify', 'Medusa', 'Payments', 'PIM', 'Search'],
  },
  {
    n: '07',
    title: 'Cloud & DevOps',
    line: 'Infrastructure that behaves: CI/CD, observability, cost discipline.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'SRE'],
  },
  {
    n: '08',
    title: 'AI & Data Engineering',
    line: 'Applied AI, copilots, pipelines and dashboards — pragmatic, measured, shipped.',
    tags: ['LLM apps', 'RAG', 'ETL', 'Vector search', 'MLOps'],
  },
  {
    n: '09',
    title: 'QA & Automation',
    line: 'Test suites and pipelines that catch regressions before your users do.',
    tags: ['E2E', 'Load testing', 'Security scans', 'Coverage'],
  },
  {
    n: '10',
    title: 'Maintenance & Support',
    line: 'SLAs, monitoring, upgrades and a team that answers on the first ring.',
    tags: ['SLAs', 'Monitoring', 'Upgrades', 'On-call'],
  },
  {
    n: '11',
    title: 'IT Consulting',
    line: 'Audits, architecture reviews and roadmaps before you commit the budget.',
    tags: ['Tech due diligence', 'Audits', 'Roadmaps', 'CTO-as-a-service'],
  },
  {
    n: '12',
    title: 'Staff Augmentation',
    line: 'Senior engineers embedded in your team, in your rhythm, under your flag.',
    tags: ['Embedded pods', 'Knowledge transfer', 'Ramp in days'],
  },
] as const;

/* — process — */
export const process = {
  index: '03',
  id: 'process',
  eyebrow: 'The Method',
  heading: ['Measure twice.', 'Ship once.'],
  copy: 'A tailoring rhythm applied to software — every stage ends with something you can see, touch and judge.',
  steps: [
    { n: '01', t: 'Discover', d: 'Workshops, audits and scope. We learn the business before touching a keyboard.' },
    { n: '02', t: 'Draft', d: 'Flows, architecture and a fixed estimate. The blueprint is signed before cloth is cut.' },
    { n: '03', t: 'Build', d: 'Two-week cadence. Every sprint closes with a demo on staging, not a status report.' },
    { n: '04', t: 'Fit', d: 'QA, performance, accessibility, security — the fitting room where rough edges go.' },
    { n: '05', t: 'Launch', d: 'Zero-downtime releases, monitoring wired in, rollback plans rehearsed.' },
    { n: '06', t: 'Alter', d: 'Measure, refine, extend. Software is kept, not abandoned, at the launch party.' },
  ],
} as const;

/* — selected work — */
export type Project = {
  n: string;
  client: string;
  title: string;
  kind: string;
  year: string;
  img: string;
};

export const work: readonly Project[] = [
  { n: '01', client: 'Athena', title: 'Revenue CRM for B2B teams', kind: 'SaaS platform', year: '2026', img: '/assets/hexcyra/work-01.jpg' },
  { n: '02', client: 'Medley', title: 'Clinic bookings, patient-first', kind: 'Mobile app', year: '2025', img: '/assets/hexcyra/work-02.jpg' },
  { n: '03', client: 'Orbit', title: 'Headless commerce at scale', kind: 'E-commerce', year: '2025', img: '/assets/hexcyra/work-03.jpg' },
  { n: '04', client: 'Ledgerline', title: 'Lending ops, automated', kind: 'Custom software', year: '2024', img: '/assets/hexcyra/work-04.jpg' },
] as const;

/* — stack marquee — */
export const stack: readonly string[] = [
  'React', 'Next.js', 'TypeScript', 'Node', 'Python', 'Flutter', 'PostgreSQL',
  'Redis', 'AWS', 'Kubernetes', 'Terraform', 'Docker', 'Stripe', 'GraphQL',
  'Prisma', 'Tailwind', 'OpenAI', 'LangChain', 'Kafka', 'ClickHouse',
] as const;

/* — engagement models — */
export const engagement = {
  index: '05',
  id: 'engagement',
  eyebrow: 'Engagement',
  heading: ['Three ways', 'to the fitting room.'],
  copy: 'Every engagement starts with a free scoping call and a written estimate. No surprise linings.',
  models: [
    {
      n: 'I',
      name: 'Fixed Scope',
      line: 'A defined project with a signed blueprint and a fixed price.',
      includes: ['Scoped spec & estimate', 'Milestone billing', '2-week build cadence', '30-day launch warranty'],
      fit: 'Best for MVPs, sites and defined builds',
      from: 'from ₹2.5L',
    },
    {
      n: 'II',
      name: 'Dedicated Pod',
      line: 'A senior product team that works as your engineering department.',
      includes: ['3–6 senior engineers', 'Your tools, your stand-ups', 'Monthly rolling contract', 'Direct Slack access'],
      fit: 'Best for funded products & scale-ups',
      from: 'from ₹4L / mo',
      featured: true,
    },
    {
      n: 'III',
      name: 'Care Retainer',
      line: 'Keep what you own running — monitored, patched, improved.',
      includes: ['SLA-backed support', 'Monitoring & on-call', 'Monthly improvement budget', 'Quarterly tech audit'],
      fit: 'Best for live products & platforms',
      from: 'from ₹60k / mo',
    },
  ],
} as const;

/* — testimonials — */
export const testimonials: readonly { quote: string; name: string; role: string }[] = [
  {
    quote: 'They treated our release pipeline like couture — every seam checked twice. We shipped a banking product with zero rollbacks in eight months.',
    name: 'R. Iyer',
    role: 'CTO, fintech scale-up',
  },
  {
    quote: 'One team took us from a Figma file to a live SaaS with paying customers. The demo-every-two-weeks rhythm kept everyone honest.',
    name: 'A. Marchetti',
    role: 'Founder, B2B SaaS',
  },
  {
    quote: 'Our app store rating went from 3.1 to 4.7 after the rebuild. Customers noticed the finishing before we could even announce it.',
    name: 'S. Kulkarni',
    role: 'Head of Product, healthcare',
  },
] as const;

/* — faq — */
export const faq: readonly { q: string; a: string }[] = [
  {
    q: 'What does Hexcyra actually cover?',
    a: 'The full IT wardrobe: web development, mobile apps, SaaS product engineering, custom software, UI/UX, e-commerce, cloud & DevOps, AI and data work, QA, maintenance, consulting and staff augmentation. If it runs on a computer, we build, fix or run it.',
  },
  {
    q: 'How does a project start?',
    a: 'With a free scoping call. We follow it with a written discovery note — goals, rough scope, timeline and a budget band — before anything is signed. Discovery for larger products is a fixed, small fee credited back if we build.',
  },
  {
    q: 'Fixed price or hourly?',
    a: 'Fixed-scope projects are priced from the signed blueprint. Ongoing product work runs on dedicated pods with a monthly rate. We never bill hourly for surprises — estimates are ours to keep.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do — fully, from the first commit. Repositories live in your accounts, and every engagement ends with clean handover documentation whether you stay or not.',
  },
  {
    q: 'How fast can you start?',
    a: 'Scoping calls usually happen within 48 hours. Small engagements start inside two weeks; dedicated pods typically assemble in two to four.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes — audits, rescues and incremental modernisation are a large part of the practice. We begin with a paid technical audit so the plan is based on evidence, not opinion.',
  },
] as const;

/* — contact — */
export const contact = {
  index: '07',
  id: 'contact',
  eyebrow: 'The Fitting Room',
  heading: ['Tell us what', 'you\'re building.'],
  copy: 'A few lines about the project is enough. You\'ll hear from a senior engineer — not a salesperson — within one working day.',
  details: [
    { k: 'Email', v: site.email, href: `mailto:${site.email}` },
    { k: 'Phone', v: site.phone, href: site.phoneHref },
    { k: 'Hours', v: site.hours },
    { k: 'Base', v: site.location },
  ],
  budgetBands: ['< ₹2.5L', '₹2.5L — ₹10L', '₹10L — ₹50L', '₹50L+', 'Not sure yet'],
} as const;
