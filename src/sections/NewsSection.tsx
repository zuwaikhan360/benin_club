import Loading from '@/components/Loading';
import NewsCard from '@/components/NewsCard';
import { buttonStyle } from '@/constants/styles';
import { News } from '@/types/newsCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NewsSection = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        const data = await response.json();
        console.log(data);
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col justify-center items-center">
        <div className="uppercase">benin club</div>
        <div className="flex md:flex-row gap-4 ">
          <h2 className="text-4xl md:text-6xl uppercase font-base mb-2">
            Latest
          </h2>
          <h2 className="text-4xl md:text-6xl uppercase font-bold mb-8 text-red">
            News
          </h2>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : news.length > 0 ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {news.slice(0, 4).map((n) => (
              <NewsCard key={n._id} news={n} />
            ))}
          </div>
          <Link href={'/#'} className="flex justify-center items-center mt-8">
            <button className={`${buttonStyle}`}>MORE NEWS</button>
          </Link>
        </>
      ) : (
        <div className="text-center py-8">
          <p>There are no news items available at this time.</p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
