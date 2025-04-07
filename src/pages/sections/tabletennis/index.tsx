import { tableTennis } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function TableTennis() {
  return (
    <div>
      <HeroSectionPage
        name="Table Tennis"
        image={tableTennis.imageUrl}
        desc="Unleash your competitive spirit on our world-class table tennis tables with expert coaching. Join us for state-of-the-art facilities and a welcoming atmosphere for all your table tennis needs."
      />
      <SectionHistory data={tableTennis} />
    </div>
  );
}
