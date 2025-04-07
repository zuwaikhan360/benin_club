import { golf } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Golf() {
  return (
    <div>
      <HeroSectionPage
        name="golf"
        image={golf.imageUrl}
        desc="Experience the ultimate golfing adventure on our meticulously maintained courses and top-of-the-line facilities. With challenging fairways and breathtaking scenery, we're the premier destination for golf enthusiasts of all levels."
      />
      <SectionHistory data={golf} />
    </div>
  );
}
