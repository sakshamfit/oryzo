export interface NavLink {
  label: string;
  href: string;
  /** Two-digit index used by the scroll-progress indicator. */
  index: string;
}

/*
 * Section index (also drives the right-edge progress rail):
 *   01 Vision · 02 Architecture · 03 Residences · 04 Amenities ·
 *   05 Lifestyle · 06 Location · 07 Gallery · 08 Investment ·
 *   09 Enquire · 10 Contact
 */

export const NAV_LINKS: NavLink[] = [
  { label: 'Residences', href: '#residences', index: '03' },
  { label: 'Amenities', href: '#amenities', index: '04' },
  { label: 'Location', href: '#location', index: '06' },
  { label: 'Gallery', href: '#gallery', index: '07' },
  { label: 'Contact', href: '#contact', index: '10' },
];

/** Mobile overlay shows the full editorial index, not just the desktop set. */
export const MENU_LINKS: NavLink[] = [
  { label: 'The Vision', href: '#vision', index: '01' },
  { label: 'Architecture', href: '#architecture', index: '02' },
  { label: 'Residences', href: '#residences', index: '03' },
  { label: 'Amenities', href: '#amenities', index: '04' },
  { label: 'Lifestyle', href: '#lifestyle', index: '05' },
  { label: 'Location', href: '#location', index: '06' },
  { label: 'Gallery', href: '#gallery', index: '07' },
  { label: 'Investment', href: '#investment', index: '08' },
  { label: 'Contact', href: '#contact', index: '10' },
];

export const NAV_ENQUIRE = {
  label: 'Enquire',
  href: '#contact',
};

/** Pixel offset applied when smooth-scrolling to an anchor. */
export const ANCHOR_OFFSET = 0;
