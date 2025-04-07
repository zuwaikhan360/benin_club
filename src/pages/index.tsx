import HorizontalCards from '@/components/HorizontalCards';
import {
  billiards,
  busStop,
  darts,
  golf,
  lawnTennis,
  leisure,
  squash,
  swimming,
  tableTennis,
} from '@/constants/sectionsCard';
import AboutSection from '@/sections/AboutSection';
import HeroSection from '@/sections/HeroSection';
import NewsSection from '@/sections/NewsSection';
import UpcomingEventSection from '@/sections/UpcomingEventSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center -mt-60 md:-mt-40 w-full">
        <HorizontalCards
          cards={[
            billiards,
            busStop,
            darts,
            golf,
            lawnTennis,
            leisure,
            squash,
            swimming,
            tableTennis,
          ]}
        />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <AboutSection showMoreButton={true} />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <UpcomingEventSection />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <NewsSection />
      </div>
    </div>
  );
}
