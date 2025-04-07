import GalleryShow from '@/components/GalleryShow';
import Loading from '@/components/Loading';
import { GalleryDocument } from '@/models/gallery.model';
import HeroSectionPage from '@/sections/HeroSectionPage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const [galleries, setGalleries] = useState<GalleryDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch upcoming galleries from an API
  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/galleries');
      const data = await response.json();
      setGalleries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching upcoming galleries:', error);
    }
  };

  // Call fetchUpcomingEvents when the component mounts
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return (
    <div>
      <HeroSectionPage
        image={galleries[0]?.image || ''}
        name="gallery"
        desc="Welcome to our gallery page! Explore our collection of photos showcasing the galleries, fun and adventure waiting for you at our recreational club. Join us for your next memorable experience!"
      />

      <div className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 shadow-xl rounded-t-lg p-4 mb-10">
          {loading ? (
            <Loading />
          ) : (
            galleries.map((gallery) => (
              <GalleryShow key={gallery._id} gallery={gallery} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
