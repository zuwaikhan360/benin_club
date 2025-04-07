import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Bar() {
  const { title, description } = services[0];
  return (
    <>
      <HeroSectionPage
        image="/images/lowerLoungeBar/image1.JPG"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              Main Bar
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The Benin Club Main Bar is situated at the Lower Lounge of the
              Club, while the Golf Section has its own Main Bar located at the
              Golf Section Main Lounge. Both bars offer a wide range of drinks,
              including soft drinks, beer, water, wine, and spirits.
            </p>
            <Gallery
              images={[
                'image1.jpeg',
                'image1.JPG',
                'image2.jpeg',
                'image3.jpeg',
              ]}
              link="/lowerLoungeBar"
            />
          </div>
          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              Mini Bar
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The Mini Bar includes the Upper Lounge Bar (also known as the Greg
              Ero Upper Lounge) and the Swimming Pool Bar.
            </p>
            <Gallery
              images={[
                'image1.JPG',
                'image2.JPG',
                'image3.JPG',
                'image4.JPG',
                'image5.JPG',
                'image6.JPG',
                'image7.JPG',
              ]}
              link="/upperLoungeBar"
            />
          </div>
        </div>
      </div>
    </>
  );
}
