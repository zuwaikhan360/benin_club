import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Card {
  imageUrl: string;
  title: string;
  info: string;
  link: string;
}

interface Props {
  cards: Card[];
}

const HorizontalCards: React.FC<Props> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardWidth = 320; // Update this to match the actual card width
  const margin = 16; // Update this to match the actual margin between cards

  useEffect(() => {
    const container = containerRef.current;

    function handleScroll() {
      setScrollLeft(container?.scrollLeft || 0);
    }

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  function handleLeftClick() {
    const container = containerRef.current;

    if (container) {
      const newScrollLeft = scrollLeft - cardWidth - margin;

      container.scrollTo({
        left: Math.max(newScrollLeft, 0),
        behavior: 'smooth',
      });
    }
  }

  function handleRightClick() {
    const container = containerRef.current;

    if (container) {
      const newScrollLeft = scrollLeft + cardWidth + margin;

      container.scrollTo({
        left: Math.min(
          newScrollLeft,
          container.scrollWidth - container.clientWidth
        ),
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    // Start scrolling automatically
    function startScrolling() {
      scrollInterval = setInterval(() => {
        const container = containerRef.current;
        if (container) {
          const cardWidth = 320; // Update this to match the actual card width
          const margin = 16; // Update this to match the actual margin between cards
          const scrollLeft = container.scrollLeft;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          if (scrollLeft >= maxScrollLeft) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollTo({
              left: scrollLeft + cardWidth + margin,
              behavior: 'smooth',
            });
          }
        }
      }, 5000); // 5 seconds
    }
    startScrolling();

    // Stop scrolling when the component unmounts
    return () => clearInterval(scrollInterval);

    // Run this effect only once on mount
  }, []);

  const containerWidth = containerRef.current?.clientWidth || 0;
  const scrollWidth = containerRef.current?.scrollWidth || 0;

  return (
    <>
      <div
        className="flex overflow-x-scroll no-scrollbar pb-4 relative"
        ref={containerRef}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex-none w-80 p-4 shadow-lg rounded-lg bg-white mx-2 relative flex flex-col justify-center "
          >
            <div className="relative h-48 mb-10">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="rounded-lg"
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-red border-white border-4 rounded-full w-20 h-20 flex justify-center items-center">
                <Image
                  src="/images/logo.webp"
                  alt="Logo"
                  width={60}
                  height={60}
                  quality={100}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg font-black uppercase my-2 text-center">
              {card.title}
            </h3>
            <p className="text-gray-500 text-sm text-center max-h-16 overflow-hidden overflow-ellipsis ">
              {card.info}
            </p>

            <Link
              href={`/sections${card.link}`}
              className="flex justify-center items-center"
            >
              <button className="inline-block px-4 py-2 border border-red text-red rounded-lg mt-4 hover:bg-red hover:text-white transition duration-300 ease-in-out">
                Learn More
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute left-4 -bottom-16 hidden md:block">
        <button
          className={`inline-flex items-center justify-center rounded-full w-10 h-10 bg-red text-white bg-opacity-75 hover:bg-opacity-100 focus:outline-none focus:bg-opacity-100 transition duration-300 ease-in-out ${
            scrollLeft === 0 ? 'opacity-50 pointer-events-none' : ''
          }`}
          onClick={handleLeftClick}
          disabled={scrollLeft === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute right-4 -bottom-16 hidden md:block">
        <button
          className={`inline-flex items-center justify-center rounded-full w-10 h-10 bg-red text-white bg-opacity-75 hover:bg-opacity-100 focus:outline-none focus:bg-opacity-100 transition duration-300 ease-in-out ${
            scrollLeft >= scrollWidth - containerWidth
              ? 'opacity-50 pointer-events-none'
              : ''
          }`}
          onClick={handleRightClick}
          disabled={scrollLeft >= scrollWidth - containerWidth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HorizontalCards;
