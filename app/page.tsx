import Announcement from '@/components/hexcyra/Announcement';
import Navbar from '@/components/hexcyra/Navbar';
import Hero from '@/components/hexcyra/Hero';
import Stats from '@/components/hexcyra/Stats';
import Manifesto from '@/components/hexcyra/Manifesto';
import Services from '@/components/hexcyra/Services';
import Process from '@/components/hexcyra/Process';
import Work from '@/components/hexcyra/Work';
import Stack from '@/components/hexcyra/Stack';
import Engagement from '@/components/hexcyra/Engagement';
import Testimonials from '@/components/hexcyra/Testimonials';
import Faq from '@/components/hexcyra/Faq';
import Contact from '@/components/hexcyra/Contact';
import Footer from '@/components/hexcyra/Footer';
import ScrollFX from '@/components/hexcyra/ScrollFX';

/* ═══════════════════════════════════════════════════════════════════════════
   HEXCYRA — single-page landing for a full-service software atelier.

   Chapters: announcement · nav · hero · proof · 01 atelier · 02 services ·
   03 process · 04 work · stack · 05 engagement · 06 client words · 07 faq ·
   08 contact · footer — with the ScrollFX system wiring Lenis, reveals,
   parallax and the reading progress.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <ScrollFX />
      <Announcement />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Stack />
        <Engagement />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
