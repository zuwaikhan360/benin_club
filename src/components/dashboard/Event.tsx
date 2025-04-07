import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi';
import Modal from '../Modal';
import EventsForm from './EventsForm';
import Loading from '../Loading';
import { EventDocument } from '@/models/event.model';
import moment from 'moment';
import EventRow from './EventRow';

interface EventProps {}

function Event(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/events');
      const data = await response.json();
      setEvents(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleUpdateEventTable = async () => {
    const response = await fetch('/api/dashboard/events');
    const data = await response.json();
    setEvents(data);
  };

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filtering events based on search query
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = events.filter((event) => {
      const fullName = event.name.toLowerCase();
      return fullName.includes(searchTerm);
    });
    setFilteredEvents(filtered);
  };

  const handleAddEvent = () => {
    setShowModal(true); // <-- update state variable to show modal
  };
  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateEventTable();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/dashboard/events/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setEvents(events.filter((event) => event._id !== id));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Events</h3>
        <button
          className="px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-200 rounded py-2 px-4 w-full md:w-64 focus:outline-none focus:border-red mb-0 md:ml-4"
          onChange={handleSearch}
        />
      </div>
      {isLoading ? (
        <div className="w-full justify-center items-center">
          <Loading />
        </div>
      ) : currentEvents.length === 0 ? (
        <div className="text-center">No event</div>
      ) : (
        <ul className="divide-y divide-gray">
          {currentEvents.map((event, index) => (
            <EventRow
              key={event._id}
              event={event}
              handleUpdateEventTable={handleUpdateEventTable}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      <div className="flex  items-center mt-8">
        <nav className="flex" aria-label="Pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-2 rounded-md mr-2 hover:bg-pink focus:outline-none ${
                currentPage === pageNumber
                  ? 'bg-red text-white font-medium'
                  : ' text-red'
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      </div>

      <Modal isOpen={showModal} onClose={onClose}>
        <EventsForm onClose={onClose} />
      </Modal>
    </div>
  );
}

export default Event;
