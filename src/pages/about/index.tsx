import AboutSection from '@/sections/AboutSection';
import HeroSectionPage from '@/sections/HeroSectionPage';
import MissionVision from '@/sections/MissionVision';

export default function About() {
  return (
    <div>
      <HeroSectionPage
        name="About Us"
        desc="Join our inclusive community of recreational enthusiasts. Pursue wellness and make meaningful connections through engaging programs and events for all skill levels and interests."
        image="/images/image1.jpg"
      />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <AboutSection />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <MissionVision />
      </div>
    </div>
  );
}
