import { billiards } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Billiards() {
  return (
    <div>
      <HeroSectionPage
        name="Billiards & Snooker"
        image={billiards.imageUrl}
        desc="Unleash your inner champion on our world-class billiard and snooker tables. Join our passionate community and experience the ultimate game room thrill."
      />
      <SectionHistory data={billiards} />
    </div>
  );
}
