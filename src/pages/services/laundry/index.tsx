import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Laundry() {
  const { title, description } = services[4];
  return (
    <>
      <HeroSectionPage
        image="/images/laundry/image1.png"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              D.S.G laundry
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              D.S.G laundry offers services such as sorting, washing, drying,
              pressing and folding of clothes and other textile materials.
              Removing stains from materials using the appropriate procedures.
            </p>

            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 09016690259.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
