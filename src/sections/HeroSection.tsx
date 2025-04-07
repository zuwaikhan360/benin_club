'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  headingVariants,
  heroVariants,
  paragraphVariants,
  buttonVariants,
} from '@/utils/motion';
import TypingAnimation from '@/components/TypingAnimation';
import { typingText } from '@/constants/heroSection';
import { buttonStyle } from '@/constants/styles';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image */}
      <Image
        src="/images/hero.webp"
        alt="Hero background image"
        fill
        objectFit="cover"
        quality={100}
      />

      <motion.div
        className="absolute  top-0 left-0 h-full w-full bg-opacity-90 bg-black flex items-center justify-center "
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center -mt-40 md:mt-0 px-4"
          variants={headingVariants}
        >
          <h1 className="text-2xl md:text-6xl font-black text-red tracking-wide mb-4 uppercase">
            <span className="font-normal text-white">Welcome to</span> Benin
            Club
          </h1>
          <motion.p
            variants={paragraphVariants}
            className="text-base md:text-xl text-white mb-4 max-w-4xl"
          >
            Where members can escape the stresses of daily life and indulge in a
            world of relaxation, fun, and connection through our wide range of
            activities, facilities, and services designed to enhance their
            well-being
          </motion.p>
          <TypingAnimation texts={typingText} />
          <Link href="/about">
            <motion.button variants={buttonVariants} className={buttonStyle}>
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
