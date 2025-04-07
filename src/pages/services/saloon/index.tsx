import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function SALOON() {
  const { title, description } = services[3];
  return (
    <>
      <HeroSectionPage
        image="/images/saloon/image1.jpg"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              JAMES BARBING SALOON
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              James Barbing Saloon specializes in cutting of hair in different
              styles. They also offer the services of hair-dying, sporting
              waves, dreadlocks and hair washing with towel warmer and
              sterilizers.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 08022404306.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
