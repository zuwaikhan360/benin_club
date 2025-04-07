import { buttonStyle } from '@/constants/styles';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import Loading from '../Loading';
import { IGallery } from '@/models/gallery.model';
import { compressImageUpload } from '@/utils/compressImage';

interface GalleryFormProps {
  id?: string;
  onClose: () => void;
}
const GalleriesForm: React.FC<GalleryFormProps> = ({ id, onClose }) => {
  const [gallery, setGallery] = useState<IGallery>({
    name: '',
    image: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      if (!id) return;
      setIsLoading(true);
      const response = await fetch(`/api/dashboard/galleries/${id}`);
      if (response.ok) {
        const savedData = await response.json();
        console.log('savedData', savedData);
        setGallery((prev) => ({ ...prev, ...savedData }));
      }
      setIsLoading(false);
    };
    fetchSavedData();
  }, [id]);

  const onSubmit = async (gallery: IGallery) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the gallery
      const response = await fetch(`/api/dashboard/galleries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gallery),
      });
      if (!response.ok) {
        throw new Error('Failed to create gallery');
      }
      onClose();
      setGallery({
        name: '',
        image: '',
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (gallery: IGallery) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the gallery
      const response = await fetch(`/api/dashboard/galleries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gallery),
      });
      if (!response.ok) {
        throw new Error('Failed to update gallery');
      }
      onClose();
      setGallery({
        name: '',
        image: '',
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === 'image' &&
      e.target instanceof HTMLInputElement &&
      e.target?.files
    ) {
      setLoadingImage(true);
      const file = e.target?.files[0];
      const compressImage = await compressImageUpload(
        file,
        1024,
        gallery.image
      );
      setGallery((prevGallery) => ({
        ...prevGallery,
        [name]: compressImage as unknown as string,
      }));
      setLoadingImage(false);
    } else {
      setGallery((prevGallery) => ({
        ...prevGallery,
        [name]: value,
      }));
    }

    // clear the error message for the input field when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!gallery.name.trim()) {
      newErrors.name = 'Please enter a gallery name';
    }

    if (!gallery.image) {
      newErrors.image = 'Please select a gallery image';
    }

    if (Object.keys(newErrors).length > 0) {
      // update the error messages for the input fields
      setErrors(newErrors);
      return;
    }

    id ? handleUpdate(gallery) : onSubmit(gallery);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
          gallery
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.name && 'border-red border'
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="Gallery Name"
              value={gallery.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <div className="relative">
              <input
                className="sr-only"
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
              />
              <div className="h-48 w-full border-dashed border-2 border-gray-300">
                {loadingImage ? (
                  <Loading />
                ) : gallery.image ? (
                  <Image
                    src={gallery.image}
                    alt={`Preview of ${gallery.name} gallery`}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-full text-gray-400"
                  >
                    <p className="mb-2">
                      <FiUpload className="h-8 w-8" />
                    </p>
                    <p className="text-sm">Upload a preview image</p>
                  </label>
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-white rounded-md">
                <label
                  htmlFor="image"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <FiUpload className="h-6 w-6 mr-2" />
                  Change
                </label>
              </div>
            </div>
            {errors.image && (
              <p className="text-red text-xs italic">{errors.image}</p>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-end">
        {loading && (
          <div className="mr-8">
            <Loading />
          </div>
        )}
        <button className={buttonStyle} type="submit">
          {id ? 'Update Gallery' : 'Create Gallery'}
        </button>
      </div>
    </form>
  );
};

export default GalleriesForm;
