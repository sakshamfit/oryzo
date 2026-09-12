import type { Metadata, Viewport } from 'next';
import { SmoothScrollProvider } from '@/components/ui/SmoothScroll';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/footer/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SequencePreload } from '@/components/cinematic/SequencePreload';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0B',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://palmparadise.example'),
  title: {
    default: 'Palm Paradise — Elevated Living',
    template: '%s · Palm Paradise',
  },
  description:
    'Discover Palm Paradise, a premium residential destination designed around architecture, comfort and modern living.',
  openGraph: {
    type: 'website',
    siteName: 'Palm Paradise',
    title: 'Palm Paradise — Elevated Living',
    description:
      'A premium residential destination designed around architecture, comfort and modern living.',
    images: [
      {
        url: '/assets/palm-paradise/architecture/hero.jpg',
        width: 2400,
        height: 1350,
        alt: 'Palm Paradise — architectural study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palm Paradise — Elevated Living',
    description:
      'A premium residential destination designed around architecture, comfort and modern living.',
    images: ['/assets/palm-paradise/architecture/hero.jpg'],
  },
  icons: {
    icon: [{ url: '/assets/palm-paradise/branding/monogram.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Runtime webfonts: fetched in the browser, never at build time, so an
            offline build can never fail. `display=swap` means the site renders
            instantly on the system stack and upgrades when the fonts arrive. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* App Router: fonts belong in the root layout (there is no _document). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..700&family=Cormorant+Garamond:ital,wght@0,300..500;1,300..500&display=swap"
        />
        <SequencePreload />
      </head>
      <body className="bg-obsidian font-sans text-ivory antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99] focus:bg-gold focus:px-4 focus:py-2 focus:text-obsidian"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <Header />
          <CustomCursor />
          <ScrollProgress />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
