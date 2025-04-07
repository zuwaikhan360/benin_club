import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IUser } from '@/models/user.model';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { buttonStyleOutline, buttonStyleW } from '@/constants/styles';
import { profileNav } from '@/constants/navbar';

interface Props {
  user: IUser;
  setNavbar: (value: boolean) => void;
}

const Dropdown = (User: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setNavbar } = User;

  const filteredNav = profileNav.filter(
    (nav) => nav.role.includes(user.role) || nav.role.includes('member')
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center mt-4 sm:mt-0 cursor-pointer"
        onClick={handleToggle}
      >
        <button className="relative h-10 w-10">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.firstName || 'profile image'}
              fill
              className="rounded-full bg-white object-cover"
              unoptimized
            />
          ) : (
            <Image
              src="/images/profile.webp"
              alt="profile image"
              fill
              className="rounded-full object-cover"
              unoptimized
            />
          )}
        </button>
        {isOpen && <div className="bg-black bg-opacity-20 fixed inset-0" />}
        {isOpen && (
          <motion.div
            className="absolute right-0 top-16 mt-2 py-2 w-48 bg-black rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ml-2 py-2 font-bold text-red">
              Welcome, {user.firstName}!
            </div>
            {filteredNav.map((nav) => (
              <Link
                key={nav.title}
                href={nav.path}
                className="block px-4 py-2 text-sm text-white hover:bg-pink capitalize font-bold"
                onClick={() => setNavbar(false)}
              >
                {nav.title}
              </Link>
            ))}

            <div className="w-full pt-4 pb-2 flex items-center justify-center">
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className={`${buttonStyleOutline} `}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
