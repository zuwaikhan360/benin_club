import { leisure } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function LeisureGames() {
  return (
    <div>
      <HeroSectionPage
        name="Leisure and Indoor Games"
        image={leisure.imageUrl}
        desc="Unwind and let loose with our variety of leisure games, perfect for a fun-filled day with family and friends. Join us for classic board games or interactive arcade games in our welcoming and entertaining atmosphere."
      />
      <SectionHistory data={leisure} />
    </div>
  );
}
