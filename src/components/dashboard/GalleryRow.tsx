import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Modal from '../Modal';
import { GalleryDocument } from '@/models/gallery.model';
import GalleriesForm from './GalleriesForm';

interface GalleryRowProps {
  gallery: GalleryDocument;
  onDelete: (id: string) => void;
  handleUpdateGalleryTable: () => void;
}
export default function GalleryRow(props: GalleryRowProps) {
  const { gallery, onDelete, handleUpdateGalleryTable } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateGalleryTable();
  };

  const handleConfirmDelete = () => {
    onDelete(gallery._id);
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
    <li key={gallery._id} className="flex flex-col items-center py-4">
      <div className="relative w-32 h-32 rounded-md overflow-hidden">
        <Image
          src={gallery.image}
          fill
          style={{ objectFit: 'cover' }}
          alt={gallery.name}
          unoptimized
        />
      </div>
      <p className="capitalize">{gallery.name}</p>
      <div className="flex items-center">
        {!showConfirm ? (
          <div className="flex items-center">
            <button
              className="px-3 py-2 bg-gray text-white rounded-md hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2  "
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

      <Modal isOpen={showModal} onClose={onClose}>
        <GalleriesForm id={gallery._id} onClose={onClose} />
      </Modal>
    </li>
  );
}
