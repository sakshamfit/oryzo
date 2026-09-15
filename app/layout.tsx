import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { site, assets, mapsSearch } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'A3 Interior Designer & Builder — Best Interior Designers in Gorakhpur',
  description: site.description,
  keywords: [
    'A3 Interior Designer & Builder',
    'interior designer Gorakhpur',
    'interior decorators Gorakhpur',
    'modular kitchen Gorakhpur',
    'residential interior design',
    'commercial interior design',
    'architect Gorakhpur',
    'turnkey interior solutions',
  ],
  openGraph: {
    title: 'A3 Interior Designer & Builder — Gorakhpur',
    description: site.description,
    type: 'website',
    url: site.url,
    siteName: site.name,
    images: [{ url: assets.hero, width: 2700, height: 1800, alt: 'Interior by A3' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  description: site.description,
  telephone: '+919451546780',
  url: site.url,
  image: assets.hero,
  hasMap: mapsSearch,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Second Floor, Commercial Road, Azeet Plaza, Buddha Vihar, Taramandal',
    addressLocality: 'Gorakhpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '273001',
    addressCountry: 'IN',
  },
  openingHours: site.hoursSchema,
  priceRange: '₹₹',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/iconify-icon@2/dist/iconify-icon.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
