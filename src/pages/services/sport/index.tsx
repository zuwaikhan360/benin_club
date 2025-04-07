import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function SPORT() {
  const { title, description } = services[5];
  return (
    <>
      <HeroSectionPage
        image="/images/image3.jpg"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              SPORT SHOP
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Benin Golf Club Pro Shop was establised to provide items needed
              for absolute golfing experience for golfers in the club and its
              environs. The sport is where all kind of quality branded apparels
              such as Shirts, Face cap, Arm sleeves, Trousers, Shorts, Golf cart
              bags of all range, Golf trolleys, Golf balls, Umbrellas, Rain
              jackets, Casino marker, Towels etc, others include Trophies and
              Medals.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 09073615380{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
