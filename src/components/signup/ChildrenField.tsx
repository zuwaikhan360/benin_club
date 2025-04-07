import { SetFormData } from "@/types/signup";
import { useState } from "react";
import Modal from "../Modal";
import { buttonStyle, buttonStyleOutline } from "@/constants/styles";
import { IChild, IUser } from "@/models/user.model";
import { BsArrowRight } from "react-icons/bs";
import { compressImageUpload } from "@/utils/compressImage";
import Loading from "../Loading";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

type ChildrenFieldProps = {
  setFormData: SetFormData;
  formData: IUser;
  updateError: (name: string, value: string) => void;
  isAdmin: boolean;
};

const ChildrenField = ({
  setFormData,
  formData,
  updateError,
  isAdmin,
}: ChildrenFieldProps) => {
  const [childFields, setChildFields] = useState<IChild>({
    name: "",
    age: 0,
    school: "",
    sex: "male",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    age: "",
    school: "",
    sex: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    updateError("children", "");
    setChildFields({
      name: "",
      age: 0,
      school: "",
      sex: "male",
      image: "",
    });
    setCurrentIndex(null);
    setIsModalOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setChildFields({ ...childFields, [name]: value });
    handleError("general", "");
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleError = (name: string, value: string) => {
    setError((prev) => ({ ...prev, [name]: value }));
  };

  const submit = () => {
    if (currentIndex !== null) {
      // Update an existing child object at the currentIndex
      setFormData((prevFormData) => {
        const updatedChildren = [...prevFormData.children];
        updatedChildren[currentIndex] = childFields;
        return {
          ...prevFormData,
          children: updatedChildren,
        };
      });
    } else {
      // Add a new child object to the children array
      setFormData((prevFormData) => ({
        ...prevFormData,
        children: [...prevFormData.children, childFields],
      }));
    }
    closeModal();
  };

  const handleSubmit = () => {
    let isValid = true;

    // Validate child's image
    if (!childFields.image) {
      handleError("image", "Please add the child's image.");
      isValid = false;
    }

    // Validate child's name
    if (!childFields.name) {
      handleError("name", "Please enter the child's name.");
      isValid = false;
    }

    // Validate child's age
    if (childFields.age <= 0) {
      handleError("age", "Please enter a valid child's age (greater than 0).");
      isValid = false;
    }

    // Validate child's school
    if (!childFields.school) {
      handleError("school", "Please enter the child's school.");
      isValid = false;
    }

    // If all validations pass, add the child
    if (isAdmin || isValid) {
      submit();
    }
  };

  async function deleteImage(imageURL: string): Promise<void> {
    try {
      const response = await fetch("/api/images/delete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageURL }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete image");
      }

      const data = await response.json();
      console.log(data.message); // Image deleted successfully
    } catch (error: any) {
      console.log("Error deleting image:", error.message);
    }
  }

  const handleRemove = (index: number) => {
    const childToDelete = formData.children[index];

    // Call deleteImage with the image URL from the child to remove the image
    if (deleteImage && childToDelete?.image) {
      deleteImage(childToDelete.image);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      children: prevFormData.children.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target?.files?.[0];
      if (!file) return;
      setIsLoading(true);
      const compressedFile = await compressImageUpload(
        file,
        1024,
        childFields.image
      );
      if (!compressedFile) return;

      setChildFields({ ...childFields, image: compressedFile });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const showChild = (child: IChild, index: number) => {
    setChildFields(child);
    setCurrentIndex(index);
    openModal();
  };

  return (
    <>
      {formData.children.map((child, index) => (
        <li key={index} className="flex items-center">
          <div className="relative w-8 h-8">
            <Image
              src={child.image}
              alt={`passPort`}
              fill
              unoptimized
              className="object-contain mx-auto"
            />
          </div>
          <span onClick={() => showChild(child, index)}>
            {child.name}, {child.age} years old, goes to {child.school},{" "}
            {child.sex}{" "}
          </span>
          <span onClick={() => handleRemove(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="#000000"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </li>
      ))}
      <button className="text-red flex items-center gap-3" onClick={openModal}>
        Add Child <BsArrowRight />
      </button>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={closeModal}
        ></div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Child</h2>
          <div className="relative h-32 w-32 mb-4">
            <input
              className="sr-only"
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
            <div className=" w-32 h-32 border-dashed border-2 border-gray ">
              {isLoading ? (
                <div className="h-32 flex justify-center items-center">
                  <Loading />
                </div>
              ) : childFields.image ? (
                <div className="w-32 h-32">
                  <Image
                    src={childFields.image}
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
                  <p className="text-sm text-center">Upload Image</p>
                </label>
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-md">
              <label
                htmlFor="image"
                className="cursor-pointer flex items-center justify-center text-sm"
              >
                <FiUpload className="h-4 w-4 mr-2 " />
                Change
              </label>
            </div>
          </div>
          {error.image ? (
            <div className="text-red">{error.image}</div>
          ) : (
            <div className="h-5" />
          )}
          <div className="mb-4">
            <label
              htmlFor={`name`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Name
            </label>
            <input
              type="text"
              id={`name`}
              name={`name`}
              placeholder="Enter child's name"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.name}
            />
            {error?.name ? (
              <div className="text-red mt-2 text-sm">{error.name}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor={`age`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Age
            </label>
            <input
              type="number"
              id={`age`}
              name={`age`}
              placeholder="Enter child's age"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.age}
            />
            {error?.age ? (
              <div className="text-red mt-2 text-sm">{error.age}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor={`school`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s School
            </label>
            <input
              type="text"
              id={`school`}
              name={`school`}
              placeholder="Enter child's school"
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.school}
            />
            {error?.school ? (
              <div className="text-red mt-2 text-sm">{error.school}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor={`sex`}
              className="block text-gray-700 font-medium mb-2"
            >
              Child&apos;s Sex
            </label>
            <select
              id={`sex`}
              name={`sex`}
              className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-redfocus:outline-red"
              onChange={(event) => handleChange(event)}
              value={childFields.sex}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {error?.sex ? (
              <div className="text-red mt-2 text-sm">{error.sex}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="flex gap-4 justify-end ml-6 mt-4">
            <button className={buttonStyleOutline} onClick={closeModal}>
              Cancel
            </button>
            <button className={buttonStyle} onClick={handleSubmit}>
              {currentIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChildrenField;
