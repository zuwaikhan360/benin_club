import Loading from '@/components/Loading';
import HeroSectionPage from '@/sections/HeroSectionPage';
import { News } from '@/types/newsCard';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PostDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<News | null>(null);

  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setExpandedImage(image);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [slug]);

  if (!post) {
    return <Loading />;
  }

  const date = new Date(post.date);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  // Render the post content
  return (
    <>
      <HeroSectionPage
        image="/images/lowerLoungeBar/image1.JPG"
        name={post.title}
        desc={`${day} ${month}`}
      />

      <div className="container mx-auto py-8">
        <div className="flex items-center mb-4 gap-8">
          <span className="text-sm text-gray-500 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border border-red text-red  rounded-md px-2  text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray my-4">{post.description}</p>

        <div className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 shadow-xl rounded-t-lg p-4">
            {[...post.images].map((image) => (
              <div className="relative" key={image}>
                <button
                  key={image}
                  className="relative inset-0 w-full h-36 md:h-72"
                  onClick={() => handleImageClick(image)}
                >
                  <Image
                    src={image}
                    alt="post image"
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {expandedImage && (
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div
              className="absolute inset-0 bg-black opacity-75"
              onClick={handleCloseExpandedImage}
            />
            <div className="relative">
              <button
                className="absolute top-0 right-0 p-4"
                onClick={handleCloseExpandedImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="max-w-screen-lg mx-auto">
                <Image
                  src={`/images/billiards/${expandedImage}`}
                  alt="Expanded image"
                  layout="responsive"
                  objectFit="contain"
                  width={1920}
                  height={1080}
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
