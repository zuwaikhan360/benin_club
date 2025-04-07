import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  images: string[];
  link: string;
}
export default function Gallery({ images, link }: Props) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setExpandedImage(image);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xl rounded-t-lg p-4">
          {images.map((image) => (
            <div className="relative" key={image}>
              <button
                key={image}
                className="relative inset-0 w-full h-36 md:h-64"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={`/images${link}/${image}`}
                  alt="Gallery image"
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                />
              </button>
            </div>
          ))}
        </div>
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
                src={`/images${link}/${expandedImage}`}
                alt="Expanded image"
                layout="responsive"
                objectFit="contain"
                width={1920}
                height={1080}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
