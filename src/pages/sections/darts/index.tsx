import { darts } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Darts() {
  return (
    <div>
      <HeroSectionPage
        name="Darts"
        image={darts.imageUrl}
        desc="Score a bullseye and elevate your game with our premier dart boards and professional-grade equipment. Join us for some casual fun or show off your skills in our welcoming and expertly crafted setup."
      />
      <SectionHistory data={darts} />
    </div>
  );
}
