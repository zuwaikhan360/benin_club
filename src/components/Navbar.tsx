'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/constants/navbar';
import { buttonStyleW } from '@/constants/styles';
import LoginForm from './LoginForm';
import { useSession } from 'next-auth/react';
import Loading from './Loading';
import Dropdown from './Dropdown';

interface NavLinkProps {
  navLink: {
    title: string;
    path: string;
    subLinks: { title: string; path: string }[];
  };
  setNavbar: (navbar: boolean) => void;
  navbar: boolean;
}

const Navbar = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full ${
        navbar ? 'bg-black bg-opacity-95' : ''
      } fixed top-0 left-0 right-0 z-30  ${
        isScrolled ? 'bg-black' : 'md:bg-transparent'
      } `}
    >
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            {/* LOGO */}
            <Link href="/">
              <Image
                src="/images/logo.webp"
                alt="Logo"
                width={80}
                height={80}
                quality={100}
                className="object-contain"
              />
            </Link>
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-white focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                <svg
                  className="h-6 w-6"
                  stroke="white"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      navbar
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 transition duration-1000 ease-in-out ${
              navbar ? 'p-12 md:p-0 block' : 'hidden'
            }`}
          >
            <ul className="h-screen md:h-auto items-center justify-center md:flex ">
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.title}
                  navLink={navLink}
                  setNavbar={setNavbar}
                  navbar={navbar}
                />
              ))}
              {status === 'loading' ? (
                <Loading />
              ) : (
                <>
                  {session?.user ? (
                    <Dropdown user={session.user} setNavbar={setNavbar} />
                  ) : (
                    <li className="relative pb-6  text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-pink  border-pink  md:hover:text-red md:hover:bg-transparent uppercase font-bold text-sm">
                      <button
                        onClick={handleOpenModal}
                        className={buttonStyleW}
                      >
                        Membership
                      </button>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={handleCloseModal}
        ></div>
      )}
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-20">
          <LoginForm handleCloseModal={handleCloseModal} />
        </div>
      )}
    </nav>
  );
};
export default Navbar;

const NavLink: React.FC<NavLinkProps> = ({ navLink, setNavbar, navbar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <li
      key={navLink.title}
      className={`relative pb-6 ${
        'text-white'
        // isActiveLink(navLink.path) ? "text-red" : "text-white"
      } py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-pink  border-pink  md:hover:text-red md:hover:bg-transparent uppercase font-bold text-sm`}
    >
      {dropdownOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 "
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      )}
      {navLink.subLinks.length ? (
        <div
          className="cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {navLink.title}
        </div>
      ) : (
        <Link href={navLink.path} onClick={() => setNavbar(!navbar)}>
          {navLink.title}
        </Link>
      )}
      {dropdownOpen && (
        <ul className="absolute rounded-md capitalize md:text-left md top-full left-0 bg-black  z-20 text-white  w-full md:w-auto">
          {navLink.subLinks.length &&
            navLink.subLinks.map((subLink) => (
              <Link
                key={subLink.title}
                href={`/sections/${subLink.path}`}
                onClick={() => {
                  setNavbar(!navbar);
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <li
                  key={subLink.title}
                  className="px-4 py-2 md:hover:bg-pink min-w-[160px] "
                >
                  <div className="text-gray-800 hover:text-purple-600">
                    {subLink.title}
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      )}
    </li>
  );
};
