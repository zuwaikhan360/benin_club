import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { SectionProps } from '@/types/signup';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import Loading from '../Loading';
import { compressImageUpload } from '@/utils/compressImage';

interface UploadResponse {
  imageUrl: string;
}

const UploadForm = (props: SectionProps) => {
  const {
    formData,
    onChange,
    onNext,
    error,
    handleError,
    setFormData,
    onPrevious,
    isAdmin = false,
  } = props;
  const [selectedImage, setSelectedImage] = useState<string>(formData.image);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      handleError('image', '');
      const file = event.target?.files?.[0];
      if (!file) return;
      setIsLoading(true);
      const compressedFile = await compressImageUpload(
        file,
        1024,
        selectedImage
      );
      if (!compressedFile) return;

      setFormData((prev) => ({ ...prev, image: compressedFile }));
      setSelectedImage(compressedFile);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.image || formData.image === '/images/profile.webp') {
      handleError('image', 'Upload a passport');
      return;
    }
    onNext();
  };

  return (
    <div className="">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
          Passport
        </label>
        <div className="relative ">
          <input
            className="sr-only"
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
          <div className=" w-full h-64 border-dashed border-2 border-gray-300">
            {isLoading ? (
              <div className="h-64 flex justify-center items-center">
                <Loading />
              </div>
            ) : selectedImage ? (
              <div className="w-64 h-64">
                <Image
                  src={selectedImage}
                  alt={`passPort`}
                  fill
                  unoptimized
                  className="object-contain mx-auto"
                />
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex flex-col p-8 items-center justify-center h-full text-gray-400"
              >
                <p className="mb-2">
                  <FiUpload className="h-8 w-8" />
                </p>
                <p className="text-sm">Upload your passport</p>
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
        {error.image && <div className="text-red">{error.image}</div>}
      </div>

      <div className="flex gap-4 justify-end ml-6 mt-16 w-full">
        <button
          className={buttonStyleOutline}
          onClick={onPrevious}
          disabled={props.loading}
        >
          Previous
        </button>
        <button
          disabled={isLoading}
          className={buttonStyle}
          onClick={() => (isAdmin ? onNext() : handleSubmit())}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
