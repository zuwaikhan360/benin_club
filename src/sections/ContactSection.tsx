import { buttonStyle } from '@/constants/styles';
import { stagger } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ContactSectionProps {}

const ContactSection: React.FC<ContactSectionProps> = ({}) => {
  return (
    <section className="flex flex-col md:flex-row items-center pb-12 bg-gray-100 px-4">
      <div className="md:w-1/2">
        <form className="flex flex-col space-y-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>

          <button type="submit" className={`${buttonStyle}`}>
            Send
          </button>
        </form>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 pl-10">
        <Image
          src="/images/reception/image3.JPG"
          alt="Contact"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default ContactSection;
