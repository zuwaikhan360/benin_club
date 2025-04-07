import Image from 'next/image';
import {
  FaUsers,
  FaRegCalendarAlt,
  FaNewspaper,
  FaMoneyBillAlt,
} from 'react-icons/fa';
import { FiActivity, FiBell, FiClipboard, FiUsers } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

function Dashboard(): JSX.Element {
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-gray text-sm mb-4">
            Here is where you can see an overview of your site&apos;s activity,
            such as the number of members, events, and page views.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-8 lg:grid-cols-3 gap-6">
            {/* Members Card */}
            <div className="bg-red rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold tracking-wide">Members</h3>
                <button className="bg-white text-red py-2 px-4 rounded-full hover:bg-red hover:text-white transition-colors">
                  View All
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold">1245</p>
                <div className="flex items-center">
                  <FaUsers className="text-4xl mr-2" />
                  <p className="text-lg font-medium">+3.5%</p>
                </div>
              </div>
            </div>

            {/* Active Members Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-red">Active Members</h3>
                <IoIosArrowForward className="text-gray" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold">358</p>
                <div className="flex items-center">
                  <FaUsers className="text-4xl text-red mr-2" />
                  <p className="text-red">-2.1%</p>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-lg font-medium text-gray mb-4">Revenue</h3>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-green">$045,321</p>
                  <p className="text-gray text-sm mt-1">
                    +1.8% from last month
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green p-2 mr-2">
                      <FaMoneyBillAlt className="text-green text-xl" />
                    </div>
                    <p className="text-gray font-semibold">
                      Total revenue this year
                    </p>
                  </div>
                  <p className="text-gray font-semibold text-lg">$2,350,045</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Events Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Events</h3>
                <IoIosArrowForward className="text-gray" />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 relative">
                  <Image
                    src="/images/image2.jpg"
                    alt="Event"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <p className="text-sm text-gray">Upcoming Event</p>
                  <p className="text-lg font-bold">Tech Summit 2023</p>
                  <p className="text-sm text-gray">May 19-21, 2023</p>
                </div>
              </div>
            </div>

            {/* News Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">News</h3>
                <IoIosArrowForward className="text-gray" />
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 relative">
                  <Image
                    src="/images/image3.jpg"
                    alt="News"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <p className="text-sm text-gray">Latest News</p>
                  <p className="text-lg font-bold">
                    New Study Reveals Benefits of Meditation
                  </p>
                  <p className="text-sm text-gray">April 21, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Latest Activity</h2>
          <ul className="list-disc list-inside">
            <li className="text-gray">3 new members joined this week</li>
            <li className="text-gray">
              The &quot;Annual Gala&quot; event was updated with new information
            </li>
            <li className="text-gray">Your site had page views yesterday</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
