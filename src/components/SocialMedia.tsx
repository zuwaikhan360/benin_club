import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface SocialMediaProps {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const SocialMedia = ({
  facebook,
  twitter,
  instagram,
  linkedin,
}: SocialMediaProps) => {
  const socialMediaLinks = [
    { platform: 'Facebook', link: facebook, icon: <FaFacebook /> },
    { platform: 'Twitter', link: twitter, icon: <FaTwitter /> },
    { platform: 'Instagram', link: instagram, icon: <FaInstagram /> },
    { platform: 'LinkedIn', link: linkedin, icon: <FaLinkedin /> },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Social Media</h3>
      <ul className="flex justify-start items-center">
        {socialMediaLinks.map(({ platform, link, icon }) => {
          return link ? (
            <li key={platform} className="mr-4 hover:text-red">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon}
                <span className="sr-only">{platform} Profile</span>
              </a>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default SocialMedia;
