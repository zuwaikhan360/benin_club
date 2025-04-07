import AddressSection from '@/sections/AddressSection';
import ContactSection from '@/sections/ContactSection';
import HeroSectionPage from '@/sections/HeroSectionPage';

const Contact = () => {
  return (
    <div>
      <HeroSectionPage
        image="/images/reception/image1.JPG"
        name="contact us"
        desc="Welcome to our recreational club's contact page! Our staff are here to help you plan your next adventure. Get in touch and join our community of adventure seekers!"
      />
      <div className="  mx-auto lg:max-w-7xl px-4 md:px-8  my-10 md:my-10  w-full">
        <AddressSection />
      </div>
      <div className="  mx-auto lg:max-w-7xl px-4 md:px-8   w-full">
        <ContactSection />
      </div>
    </div>
  );
};

export default Contact;
