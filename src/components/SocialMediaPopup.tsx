import React, { useEffect, useState } from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTimes,
  FaEdit,
} from 'react-icons/fa';
import SocialMedia from './SocialMedia';
import Loading from './Loading';
import { useSession } from 'next-auth/react';

type SocialMediaProps = {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  step: number;
};

export default function SocialMediaPopup(props: SocialMediaProps) {
  const { facebook, twitter, instagram, linkedin, step } = props;
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editSocial, setEditSocial] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook,
    twitter,
    instagram,
    linkedin,
  });
  const [socialMediaLinksI, setSocialMediaLinksI] = useState({
    facebook,
    twitter,
    instagram,
    linkedin,
  });

  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (!facebook || !twitter || !instagram || !linkedin) {
      setShowPopup(true);
    }
  }, [facebook, instagram, linkedin, twitter]);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    const response = await fetch('/api/membership', {
      method: 'PUT',
      body: JSON.stringify({ socials: socialMediaLinks }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      await update({ socials: socialMediaLinks });
      setShowPopup(false);
    } else {
      setError('Error saving form data');
    }
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSocialMediaLinks({ ...socialMediaLinks, [name]: value });
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleAddBios = () => {
    setShowPopup(true);
    setEditSocial(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {step === 2 &&
        showPopup &&
        (!editSocial ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div onClick={handleCancel} className="w-full flex justify-end">
                <FaTimes />
              </div>
              <h2 className="text-lg font-bold mb-2">Add Social</h2>

              <p className="mb-4">
                Please add your social medias to your profile, so other member
                can connect with you
              </p>

              <button
                className="bg-red text-white py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-red transition duration-300 ease-in-out"
                onClick={() => setEditSocial(true)}
              >
                Add{' '}
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-full max-w-md mx-auto rounded-md shadow-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-red">
                <h3 className="text-lg font-bold text-white">
                  Edit Social Media Links
                </h3>
                <button onClick={handleCancel} className="text-white">
                  <FaTimes />
                </button>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="facebook"
                  >
                    <FaFacebook className="inline-block mr-2" />
                    Facebook URL
                  </label>

                  {!socialMediaLinksI.facebook ? (
                    <input
                      className="border rounded-md py-2 px-3 w-full"
                      type="text"
                      name="facebook"
                      id="facebook"
                      value={socialMediaLinks.facebook}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="ml-4 mr-2">{facebook}</div>
                      <FaEdit
                        onClick={() =>
                          setSocialMediaLinksI((prev) => ({
                            ...prev,
                            facebook: '',
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="twitter"
                  >
                    <FaTwitter className="inline-block mr-2" />
                    Twitter URL
                  </label>

                  {!socialMediaLinksI.twitter ? (
                    <input
                      className="border rounded-md py-2 px-3 w-full"
                      type="text"
                      name="twitter"
                      id="twitter"
                      value={socialMediaLinks.twitter}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="ml-4 mr-2">{twitter}</div>
                      <FaEdit
                        onClick={() =>
                          setSocialMediaLinksI((prev) => ({
                            ...prev,
                            twitter: '',
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="instagram"
                  >
                    <FaInstagram className="inline-block mr-2" />
                    Instagram URL
                  </label>

                  {!socialMediaLinksI.instagram ? (
                    <input
                      className="border rounded-md py-2 px-3 w-full"
                      type="text"
                      name="instagram"
                      id="instagram"
                      value={socialMediaLinks.instagram}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="ml-4 mr-2">{instagram}</div>
                      <FaEdit
                        onClick={() =>
                          setSocialMediaLinksI((prev) => ({
                            ...prev,
                            instagram: '',
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="instagram"
                  >
                    <FaLinkedin className="inline-block mr-2" />
                    LinkedIn URL
                  </label>

                  {!socialMediaLinksI.linkedin ? (
                    <input
                      className="border rounded-md py-2 px-3 w-full"
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      value={socialMediaLinks.linkedin}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="ml-4 mr-2">{linkedin}</div>
                      <FaEdit
                        onClick={() =>
                          setSocialMediaLinksI((prev) => ({
                            ...prev,
                            linkedin: '',
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <button
                    className="bg-red text-white py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-red transition duration-300 ease-in-out"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      <SocialMedia
        facebook={facebook}
        twitter={twitter}
        instagram={instagram}
        linkedin={linkedin}
      />

      <p className="text-sm text-center px-4 mt-4" onClick={handleAddBios}>
        {'Click here to connect your social media.'}
      </p>
    </div>
  );
}
