import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi';
import Modal from '../Modal';
import EventsForm from './EventsForm';
import Loading from '../Loading';
import moment from 'moment';
import { GalleryDocument } from '@/models/gallery.model';
import GalleriesForm from './GalleriesForm';
import GalleryRow from './GalleryRow';

interface EventProps {}

function Gallery(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleriesPerPage] = useState(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [galleries, setGalleries] = useState<GalleryDocument[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<GalleryDocument[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/galleries');
      const data = await response.json();
      setGalleries(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredGalleries(galleries);
  }, [galleries]);

  // Pagination logic
  const indexOfLastEvent = currentPage * galleriesPerPage;
  const indexOfFirstEvent = indexOfLastEvent - galleriesPerPage;
  const currentEvents = filteredGalleries.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredGalleries.length / galleriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleUpdateGalleryTable = async () => {
    const response = await fetch('/api/dashboard/galleries');
    const data = await response.json();
    setGalleries(data);
  };

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filtering galleries based on search query
  const handleSearch = (gallery: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = gallery.target.value.toLowerCase();
    const filtered = galleries.filter((gallery) => {
      const fullName = gallery.name.toLowerCase();
      return fullName.includes(searchTerm);
    });
    setFilteredGalleries(filtered);
  };

  const handleAddEvent = () => {
    setShowModal(true); // <-- update state variable to show modal
  };
  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateGalleryTable();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/dashboard/galleries/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setGalleries(galleries.filter((gallery) => gallery._id !== id));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Galleries</h3>
        <button
          className="px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
          onClick={handleAddEvent}
        >
          Add Gallery
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search galleries..."
          className="border border-gray-200 rounded py-2 px-4 w-full md:w-64 focus:outline-none focus:border-red mb-0 md:ml-4"
          onChange={handleSearch}
        />
      </div>
      {isLoading ? (
        <div className="w-full justify-center items-center">
          <Loading />
        </div>
      ) : currentEvents.length === 0 ? (
        <div className="text-center">No gallery</div>
      ) : (
        <ul className="flex flex-row flex-wrap gap-8">
          {currentEvents.map((gallery) => (
            <GalleryRow
              key={gallery._id}
              gallery={gallery}
              handleUpdateGalleryTable={handleUpdateGalleryTable}
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
        <GalleriesForm onClose={onClose} />
      </Modal>
    </div>
  );
}

export default Gallery;
