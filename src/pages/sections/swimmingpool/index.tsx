import { swimming } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function SwimmingPool() {
  return (
    <div>
      <HeroSectionPage
        name="Swimming Pool"
        image={swimming.imageUrl}
        desc="Experience aquatic fun and relaxation on our pristine swimming pools with top-of-the-line amenities. Join us to cool off or improve your stroke in a welcoming atmosphere with crystal-clear waters."
      />
      <SectionHistory data={swimming} />
    </div>
  );
}
