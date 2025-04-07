import HeroSectionPage from '@/sections/HeroSectionPage';
import ServicesSection from '@/sections/ServicesSection';

const Services = () => {
  return (
    <div>
      <HeroSectionPage
        name="services"
        desc="Unwind with luxurious amenities, delicious dining, and outstanding service. At our club, we are your hero for relaxation and entertainment."
        image="/images/manetKitchen/image1.JPG"
      />
      <ServicesSection />
    </div>
  );
};

export default Services;
