import { News } from '@/types/newsCard';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const date = new Date(news.date);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return (
    <Link
      href={`/post/${news.slug}`}
      className="rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-56">
        <Image
          src={news.images[0]}
          alt={news.title}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <div className="absolute bottom-0 left-0 bg-white text-black">
          <p className="text-lg font-bold  px-4">{day}</p>
          <p className="text-sm  px-4">{month}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex space-x-2">
          {news.tags.map((tag) => (
            <span
              key={tag}
              className="border border-red text-red  rounded-md px-2  text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mt-2 capitalize">{news.title}</h2>
        <p className="text-gray-600 mt-2 line-clamp-2">{news.description}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
