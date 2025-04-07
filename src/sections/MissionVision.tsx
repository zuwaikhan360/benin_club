import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import Image from 'next/image';
import Link from 'next/link';

const MissionVision = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-gray-100 ">
      <div className="relative w-full h-96 md:w-1/2 ">
        <Image
          src="/images/hero.webp"
          alt="Hero background image"
          fill
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="md:w-1/2 md:ml-8  mb-4 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold  uppercase text-red">
          Benin CLub
        </h2>
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">
          mission & vision
        </h2>

        <h3 className="text-lg font-bold">Mission Statement</h3>
        <p className="text-gray-700 mb-4 text-justify">
          To be the foremost recreational family Club in the country and to
          strive to contribute towards charitable deeds and other such endeavors
          aimed at helping the needy and less-privileged in the society.
        </p>
        <h3 className="text-lg font-bold">Vision Statement</h3>

        <p className="text-gray-700 mb-4 text-justify">
          To entrench a family based recreational / social Club for the benefit
          of all stakeholders.
        </p>
        <div className="flex gap-3 mt-4 flex-col md:flex-row">
          <div>
            <Link href="/membership">
              <button className={`${buttonStyle} `}>Join The Club</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
