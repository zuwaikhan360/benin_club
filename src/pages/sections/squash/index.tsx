import { squash } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Golf() {
  return (
    <div>
      <HeroSectionPage
        name="squash"
        image={squash.imageUrl}
        desc="Elevate your squash game on our world-class courts with expert coaching. Join our welcoming community and enjoy top-of-the-line facilities for all your squash needs."
      />
      <SectionHistory data={squash} />
    </div>
  );
}
