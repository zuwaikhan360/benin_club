import { EventDocument } from '@/models/event.model';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Modal from '../Modal';
import EventsForm from './EventsForm';

interface EventRowProps {
  event: EventDocument;
  onDelete: (id: string) => void;
  handleUpdateEventTable: () => void;
}
export default function EventRow(props: EventRowProps) {
  const { event, onDelete, handleUpdateEventTable } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateEventTable();
  };

  const handleConfirmDelete = () => {
    onDelete(event._id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  return (
    <li key={event._id} className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-md mr-4 overflow-hidden">
            <Image
              src={event.image}
              layout="fill"
              objectFit="cover"
              alt={event.name}
              unoptimized
            />
          </div>
          <div>
            <h4 className="text-lg font-medium">{event.name}</h4>
            <p className="text-gray">
              {moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}
              {event.time}
            </p>
            <p className="text-gray">{event.location}</p>
          </div>
        </div>
        <div className="flex items-center">
          {!showConfirm ? (
            <div className="flex items-center">
              <button
                className="px-3 py-2 bg-gray text-white rounded-md hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 ml-4 "
                onClick={onOpen}
              >
                <FiEdit />
              </button>
              <button
                className="ml-2 px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
                onClick={handleDelete}
              >
                <FiTrash />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button className="mr-2 text-red " onClick={handleConfirmDelete}>
                Yes
              </button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray mt-2">{event.description}</p>

      <Modal isOpen={showModal} onClose={onClose}>
        <EventsForm id={event._id} onClose={onClose} />
      </Modal>
    </li>
  );
}
