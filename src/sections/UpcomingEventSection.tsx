import Loading from '@/components/Loading';
import UpcomingEventCard from '@/components/UpComingEventCard';
import { buttonStyle } from '@/constants/styles';
import Event from '@/types/events';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const UpcomingEventSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch upcoming events from an API
  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();
      console.log('hgfdsxfgj', data);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
    }
  };

  // Call fetchUpcomingEvents when the component mounts
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col justify-center items-center">
        <div className="uppercase">book</div>
        <div className="flex md:flex-row gap-4 ">
          <h2 className="text-4xl md:text-6xl uppercase font-base mb-2">
            Upcoming
          </h2>
          <h2 className="text-4xl md:text-6xl uppercase font-bold mb-8 text-red">
            events
          </h2>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : events.length > 0 ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((event) => (
              <UpcomingEventCard key={event._id} {...event} />
            ))}
          </div>
          <Link href={'/#'} className="flex justify-center items-center mt-8">
            <button className={`${buttonStyle}`}>MORE EVENT</button>
          </Link>
        </>
      ) : (
        <div className="text-center py-8">
          <p>There are no upcoming events at this time.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventSection;
