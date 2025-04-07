import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '../Modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { PostDocument } from '@/models/post.model';
import moment from 'moment';
import PostsForm from './PostsForm';

interface PostRowProps {
  post: PostDocument;
  onDelete: (id: string) => void;
  handleUpdatePostTable: () => void;
}
export default function PostRow(props: PostRowProps) {
  const { post, onDelete, handleUpdatePostTable } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdatePostTable();
  };

  const handleConfirmDelete = () => {
    onDelete(post._id);
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
    <>
      <tr className="bg-white">
        <td className="px-4 py-2">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-md mr-4 overflow-hidden">
              <Image
                src={post.images[0]}
                fill
                style={{ objectFit: 'cover' }}
                alt={post.title}
                unoptimized
              />
            </div>
            <div>
              <h4 className="text-lg font-medium">{post.title}</h4>
            </div>
          </div>
        </td>
        <td className="px-4 py-2">
          {moment(post.date).format('MMMM Do YYYY')}
        </td>
        <td className="px-4 py-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-sm font-medium bg-gray-200 rounded-md mr-2"
            >
              {tag}
            </span>
          ))}
        </td>
        <td className="px-4 py-2 line-clamp-2">{post.description}</td>
        <td className="px-4 py-2">
          {!showConfirm ? (
            <>
              <button className="mr-2" onClick={onOpen}>
                <FaEdit />
              </button>
              <button className="text-red" onClick={handleDelete}>
                <FaTrash />
              </button>
            </>
          ) : (
            <div className="flex items-center">
              <button className="mr-2 text-red " onClick={handleConfirmDelete}>
                Yes
              </button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
        </td>
      </tr>

      <Modal isOpen={showModal} onClose={onClose}>
        <PostsForm id={post._id} onClose={onClose} />
      </Modal>
    </>
  );
}
