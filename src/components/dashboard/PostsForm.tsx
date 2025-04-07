import { buttonStyle, buttonStyleOutline } from "@/constants/styles";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import { FiTrash, FiUpload } from "react-icons/fi";
import moment from "moment";
import { IPost } from "@/models/post.model";
import { compressImageUpload } from "@/utils/compressImage";

interface PostFormProps {
  id?: string;
  onClose: () => void;
}

const initialPost = {
  title: "",
  tags: [],
  date: new Date(),
  description: "",
  images: [],
};
const PostsForm: React.FC<PostFormProps> = ({ id, onClose }) => {
  const [post, setPost] = useState<IPost>(initialPost);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const response = await fetch(`/api/dashboard/posts/${id}`);
        console.log(response);
        if (response.ok) {
          const savedData = await response.json();
          setPost((prev) => ({ ...prev, ...savedData }));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrors((prev) => ({ ...prev, general: "Error fetvhing data" }));
      }
    };
    fetchSavedData();
  }, [id]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",");
    setPost((prevPost) => ({
      ...prevPost,
      tags: tags.map((tag) => tag.trim()),
    }));
  };

  const handleImageChange = (e: EventTarget & HTMLInputElement) => {
    setLoading(true);
    const files = Array.from(e.files || []);
    const imagePromises = files.map((file) => {
      return compressImageUpload(file, 1024);
    });

    Promise.all(imagePromises)
      .then((results) => {
        const images = results.filter((result) => result) as string[];
        setPost((prevPost) => ({
          ...prevPost,
          images: [...prevPost.images, ...images],
        }));
        setLoading(false);
      })
      .catch((error) => {
        // Handle error appropriately, e.g., display an error message
        console.error("Error compressing images:", error);
        setLoading(false);
      });
  };

  const handleImageRemoval = async (image: string, index: number) => {
    try {
      setLoading(true);
      // const response = await fetch(`/api/images/delete`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image }),
      // });

      setPost((prevPost) => {
        const newImages = [...prevPost.images];
        newImages.splice(index, 1);
        return {
          ...prevPost,
          images: newImages,
        };
      });

      // if (response.ok) {
      //   await response.json();

      //   setLoading(false);
      // } else {
      //   const errorData = await response.json();
      //   console.log(errorData);
      //   setLoading(false);
      //   throw new Error(errorData.message);
      // }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target?.files
    ) {
      handleImageChange(e.target);
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }
  };

  const createPost = async (post: IPost) => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      setLoading(false);
      onClose();
      setPost(initialPost);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error,
      }));
      console.error(error);
      setLoading(false);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  const updatePost = async (post: IPost) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the post
      const response = await fetch(`/api/dashboard/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      onClose();
      setPost(initialPost);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};

    if (!post.title) {
      validationErrors.title = "Title is required";
    }

    if (!post.description) {
      validationErrors.description = "Description is required";
    }

    if (post.tags.length === 0) {
      validationErrors.tags = "At least one tag is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      if (id) {
        // Update existing post logic
        await updatePost(post);
      } else {
        // Create new post logic
        await createPost(post);
      }

      onClose();
    } catch (error) {
      console.log(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Error submitting the form",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
          post
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loading />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.title && "border-red"
              }`}
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              value={post.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.tags && "border-red"
              }`}
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter tags, separated by commas"
              value={post.tags}
              onChange={handleTagsChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.date && "border-red"
              }`}
              id="date"
              name="date"
              type="date"
              value={moment(post.date).format("YYYY-MM-DD")}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.description && "border-red"
              }`}
              id="description"
              name="description"
              placeholder="Enter description"
              value={post.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-4">Images</label>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              onChange={handleChange}
              className="py-2 sr-only"
            />
            <label htmlFor="image" className={`${buttonStyleOutline}`}>
              Add image
            </label>
            <div className="mt-2">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border p-2 rounded-md mb-2"
                >
                  <div className="relative w-16 h-16 rounded-md mr-4 overflow-hidden">
                    <Image
                      src={image}
                      fill
                      alt={post.title}
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleImageRemoval(image, index)}
                    className="text-red-500"
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-end">
        {loading && (
          <div className="mr-8">
            <Loading />
          </div>
        )}
        <button className={buttonStyle} type="submit">
          {id ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default PostsForm;
