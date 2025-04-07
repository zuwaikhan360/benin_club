import { GalleryDocument } from '@/models/gallery.model';
import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryShowProps {
  gallery: GalleryDocument;
}
function GalleryShow({ gallery }: GalleryShowProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleImageClick = (image: string) => {
    setExpandedImage(image);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };
  return (
    <div
      className="relative"
      key={gallery._id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="relative inset-0 w-full h-36 md:h-72"
        onClick={() => handleImageClick(gallery.image)}
      >
        <Image
          src={gallery.image}
          alt="Gallery image"
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </button>
      <div
        className={`absolute bottom-0 left-0 right-0 font-bold p-4 bg-black bg-opacity-40 text-white text-center capitalize text-lg ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {gallery.name}
      </div>
      {expandedImage && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={handleCloseExpandedImage}
          />
          <div className="relative">
            <button
              className="absolute top-0 right-0 p-4"
              onClick={handleCloseExpandedImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="max-w-screen-lg mx-auto">
              <Image
                src={expandedImage}
                alt="Expanded image"
                unoptimized
                layout="responsive"
                objectFit="contain"
                width={1920}
                height={1080}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 font-bold text-lg p-4 -translate-x-1/2 text-white drop-shadow-lg capitalize ">
              {gallery.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryShow;
