import { Service } from '@/types/services';
import {
  FaDumbbell,
  FaFutbol,
  FaRunning,
  FaSpa,
  FaTheaterMasks,
  FaUsers,
  FaUtensils,
  FaCocktail,
  FaFire,
  FaCut,
  FaTshirt,
  FaFootballBall,
} from 'react-icons/fa';

export const services: Service[] = [
  {
    id: 9,
    title: 'Bar tending',
    description:
      'Enhance your club experience with our exceptional bartending services, with skilled mixologists, creative drink menus, and a personalized touch for unforgettable moments with friends.',
    icon: FaCocktail,
    link: 'bar',
  },
  {
    id: 10,
    title: 'Catering / Restaurant',
    description:
      'Experience exquisite flavors and unparalleled service at our restaurant and catering services, where every dish is crafted with passion and creativity to delight your senses.',
    icon: FaUtensils,
    link: 'catering',
  },
  {
    id: 11,
    title: 'Grill / Barbecue',
    description:
      'Unleash your taste buds with our mouthwatering grill and barbecue services, expertly crafted with fresh ingredients and tantalizing aromas for an unforgettable culinary adventure.',
    icon: FaFire,
    link: 'grill',
  },
  {
    id: 12,
    title: 'Saloon',
    description:
      'Step into the world of classic grooming and refined style at our saloon, where our expert barbers provide top-notch haircuts, shaves, and grooming services that leave you looking and feeling your best.',
    icon: FaCut,
    link: 'saloon',
  },
  {
    id: 13,
    title: 'Laundry',
    description:
      'Leave the dirty work to us at our laundry services, where we use cutting-edge technology and provide top-notch customer service to exceed your expectations with fresh, clean clothes.',
    icon: FaTshirt,
    link: 'laundry',
  },
  {
    id: 14,
    title: 'Sport Shop',
    description:
      'Discover the ultimate sporting experience at our Sport Shop, where you will find everything you need to take your game to the next level.',
    icon: FaFootballBall,
    link: 'sport',
  },

  // {
  //   id: 1,
  //   title: 'Sports facilities',
  //   description:
  //     'We offer a range of state-of-the-art sports facilities, including basketball and tennis courts, swimming pools, and more.',
  //   icon: FaFutbol,
  // },
  // {
  //   id: 2,
  //   title: 'Fitness classes',
  //   description:
  //     'Our fitness classes are led by experienced trainers and cover a range of disciplines, including yoga, Pilates, and strength training.',
  //   icon: FaDumbbell,
  // },
  // {
  //   id: 3,
  //   title: 'Social events',
  //   description:
  //     'We host a variety of social events throughout the year, including parties, concerts, and cultural events.',
  //   icon: FaTheaterMasks,
  // },
  // {
  //   id: 4,
  //   title: 'Entertainment',
  //   description:
  //     'We offer a range of entertainment options, including live music, movies, and theater performances.',
  //   icon: FaUsers,
  // },
  // {
  //   id: 5,
  //   title: 'Dining',
  //   description:
  //     'Our dining options include a variety of restaurants and cafes serving everything from casual snacks to gourmet cuisine.',
  //   icon: FaUtensils,
  // },
  // {
  //   id: 6,
  //   title: 'Sports teams',
  //   description:
  //     'We offer a range of sports teams for members to join, including basketball, soccer, and volleyball.',
  //   icon: FaFutbol,
  // },
  // {
  //   id: 7,
  //   title: 'Spa services',
  //   description:
  //     'Our spa offers a range of treatments, including massages, facials, and body wraps, to help you relax and unwind.',
  //   icon: FaSpa,
  // },
  // {
  //   id: 8,
  //   title: 'Personal training',
  //   description:
  //     'Our experienced personal trainers will work with you to create a custom fitness plan and help you achieve your goals.',
  //   icon: FaRunning,
  // },
];
