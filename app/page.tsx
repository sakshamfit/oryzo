import Nav from '@/components/a3/Nav';
import Hero from '@/components/a3/Hero';
import Philosophy from '@/components/a3/Philosophy';
import Projects from '@/components/a3/Projects';
import Highlights from '@/components/a3/Highlights';
import Gallery from '@/components/a3/Gallery';
import Contact from '@/components/a3/Contact';
import Footer from '@/components/a3/Footer';

/* ═══════════════════════════════════════════════════════════════════════════
   A3 INTERIOR DESIGNER & BUILDER — single-page landing.
   Chapters: nav (blend-difference) · hero · philosophy (sticky metrics) ·
   featured projects · highlights (dark) · gallery mosaic · contact · footer.
   Native scrolling only — html has .scroll-smooth, no scroll library.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Highlights />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
