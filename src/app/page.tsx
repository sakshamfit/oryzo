import { Hero } from '@/components/hero/Hero';
import { Vision } from '@/components/sections/Vision';
import { Architecture } from '@/components/sections/Architecture';
import { Residences } from '@/components/sections/Residences';
import { Amenities } from '@/components/sections/Amenities';
import { Lifestyle } from '@/components/sections/Lifestyle';
import { LocationSection } from '@/components/location/LocationSection';
import { Gallery } from '@/components/gallery/Gallery';
import { Investment } from '@/components/sections/Investment';
import { CallToAction } from '@/components/sections/CallToAction';

export default function Page() {
  return (
    <>
      <Hero />
      <Vision />
      <Architecture />
      <Residences />
      <Amenities />
      <Lifestyle />
      <LocationSection />
      <Gallery />
      <Investment />
      <CallToAction />
    </>
  );
}
