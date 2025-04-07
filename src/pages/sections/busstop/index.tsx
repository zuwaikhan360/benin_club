import { busStop } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function BusStop() {
  return (
    <div>
      <HeroSectionPage
        name="Bus Stop"
        image={busStop.imageUrl}
        desc="Welcome to the Parliament of Benin Club, a socially vibrant space that enhances fellowship and interaction amongst members. Join us for comfortable seating, annual events like manifesto night, and a must-visit section that cuts across all segments of society."
      />
      <SectionHistory data={busStop} />
    </div>
  );
}
