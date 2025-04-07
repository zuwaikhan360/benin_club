import { lawnTennis } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function LawnTennis() {
  return (
    <div>
      <HeroSectionPage
        name="Lawn Tennis"
        image={lawnTennis.imageUrl}
        desc="Unleash your inner champion on our top-of-the-line tennis facilities with expert coaching. Join our welcoming community and take your game to the next level with state-of-the-art equipment."
      />
      <SectionHistory data={lawnTennis} />
    </div>
  );
}
