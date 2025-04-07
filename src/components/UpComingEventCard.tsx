'use client';
import React from 'react';
import Image from 'next/image';
import moment from 'moment';

interface Props {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

const UpcomingEventCard: React.FC<Props> = ({
  name,
  date,
  time,
  location,
  description,
  image,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative">
      <div
        className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className=" object-cover transition duration-500 ease-in-out transform hover:scale-105"
        />
        <div
          className={`bg-black bg-opacity-40 absolute rounded-tr-lg bottom-0 left-0 p-6 transition-opacity duration-500 ease-in-out ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            {name}
          </h2>
          <p className="text-lg text-white drop-shadow-2xl">
            {moment(date).format('MMM DD, YYYY')}
          </p>
        </div>
        <div
          className={`absolute inset-0 flex flex-col items-start justify-end transition-opacity duration-500 ease-in-out ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <div className="p-6 bg-black bg-opacity-75 w-full">
            <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
            <div className="flex flex-col">
              <p className="text-lg text-white">
                {moment(date).format('MMM DD, YYYY')}
                at {time}
              </p>
              <p className="text-lg text-white mt-2">{location}</p>
              <p className="text-lg text-white mt-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
