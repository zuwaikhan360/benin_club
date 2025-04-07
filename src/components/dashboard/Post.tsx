import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { PostDocument } from '@/models/post.model';
import PostRow from './PostRow';
import Loading from '../Loading';
import PostsForm from './PostsForm';
import Modal from '../Modal';

interface PostProps {}

function Post(): JSX.Element {
  const [posts, setPosts] = useState<PostDocument[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/posts');
      const data = await response.json();
      setPosts(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleUpdatePostTable = async () => {
    const response = await fetch('/api/dashboard/posts');
    const data = await response.json();
    setPosts(data);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = posts.filter((post) => {
      const title = post.title.toLowerCase();
      return title.includes(searchTerm);
    });
    setFilteredPosts(filtered);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/dashboard/posts/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const handleAddEvent = () => {
    setShowModal(true); // <-- update state variable to show modal
  };
  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdatePostTable();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Posts</h3>
        <button
          onClick={handleAddEvent}
          className="px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        >
          Add Post
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray rounded-md"
          onChange={handleSearch}
        />
      </div>
      <div className="w-[calc(100vw_-_75px)] md:w-auto overflow-y-auto">
        {isLoading ? (
          <div className="w-full justify-center items-center">
            <Loading />
          </div>
        ) : currentPosts.length === 0 ? (
          <div className="text-center">No post</div>
        ) : (
          <table className="w-full ">
            <thead>
              <tr className="bg-gray-200 whitespace-nowrap">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th className="px-4 py-2 text-left">Short Description</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <PostRow
                  key={post._id}
                  post={post}
                  handleUpdatePostTable={handleUpdatePostTable}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex  items-center mt-4">
        <ul className="flex">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`px-3 py-1 rounded-md mr-2 hover:bg-gray-200 focus:outline-none ${
                  currentPage === pageNumber ? 'bg-red text-white' : 'text-red'
                }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={showModal} onClose={onClose}>
        <PostsForm onClose={onClose} />
      </Modal>
    </div>
  );
}

export default Post;
