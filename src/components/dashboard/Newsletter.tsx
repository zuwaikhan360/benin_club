import { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import Loading from '../Loading';
import WalletRow from './WalletRow';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import Modal from '../Modal';
import NewsletterRow from './NewsletterRow';
import PdfUpload from '../PdfUpload';

export type NewsletterDataProps = {
  _id: string;
  email: string;
  isMember: boolean;
  createdAt: string;
};
type FetchNewsletterDataProps = {
  query: string;
  page: number;
};

const Newsletter = () => {
  const [newsletterData, setNewsletterData] = useState<NewsletterDataProps[]>(
    []
  );
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState('');
  const [newletterUrl, setNewletterUrl] = useState('');

  const fetchNewsletterData = useCallback(
    async ({ query, page }: FetchNewsletterDataProps) => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(
          `/api/dashboard/newsletter?page=${page}&pageSize=${pageSize}&search=${query}`
        );
        if (!response.ok) {
          throw new Error('Unable to fetch newsletter data.');
        }
        const newsletter = await response.json();
        console.log(newsletter);
        setNewsletterData(newsletter.newsletters);
        setTotalPages(Math.ceil(newsletter.totalEmails / pageSize));
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      setIsLoading(false);
    },
    [pageSize]
  );

  const fetchNewsletter = async () => {
    try {
      setError('');
      const response = await fetch('/api/newsletter/upload');
      if (!response.ok) {
        throw new Error('Failed to fetch newsletter url');
      }
      const data = await response.json();
      setNewletterUrl(data.newsletter);
    } catch (error: any) {
      console.error('Error fetching newsletter:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNewsletter();
  }, []);

  useEffect(() => {
    fetchNewsletterData({ query: '', page: currentPage });
  }, [currentPage, fetchNewsletterData, pageSize]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSendEmail = async () => {
    setSendingEmail(true);
    setErrorSendingEmail('');
    try {
      const response = await fetch(`/api/newsletter/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Unable to fetch newsletter url.');
      }
      const newsletterurl = await response.json();
      alert(newsletterurl.message);
    } catch (error: any) {
      console.log(error);
      setErrorSendingEmail(error.message);
    }
    setSendingEmail(false);
  };

  const handleUpdateNewsletterTable = () => {
    fetchNewsletterData({ query: '', page: currentPage });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    fetchNewsletterData({ query: searchTerm, page: 1 });
  };

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateNewsletterTable();
    fetchNewsletter();
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center w-64 relative border border-gray rounded-md">
          <span className="absolute pl-3 inset-y-0 left-0 flex items-center">
            <FiSearch className="text-red" />
          </span>
          <input
            className="py-2 pl-10 pr-4 w-full rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-3">
          {newletterUrl ? (
            <a
              href={newletterUrl}
              target="_blank"
              className="text-red hover:underline cursor-pointer"
              rel="noreferrer"
            >
              Viev Current Newsleter
            </a>
          ) : (
            <div>No newsleter Uploaded!</div>
          )}
          <button className={buttonStyleOutline} onClick={onOpen}>
            upload newsletter
          </button>

          {sendingEmail ? (
            <Loading />
          ) : (
            <button
              className={`${buttonStyle} ${
                !newletterUrl && 'opacity-50 cursor-not-allowed hover:bg-red'
              }`}
              disabled={!newletterUrl}
              onClick={handleSendEmail}
            >
              Send newsletter
            </button>
          )}
        </div>
      </div>
      {errorSendingEmail && (
        <div className="text-red text-right">{errorSendingEmail}</div>
      )}

      <Modal isOpen={showModal} onClose={onClose}>
        <PdfUpload />
      </Modal>
      {error && <div className="text-red"> {error}</div>}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : newsletterData.length === 0 ? (
        <div>No data found.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="v">
                <th className="py-2 px-4 text-left">Email</th>
                {/* <th className="py-2 px-4 text-left">Reg Member</th> */}
                {/* <th className="py-2 px-4 text-left">Action</th> */}
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {newsletterData.map((member) => (
                <NewsletterRow
                  handleUpdateNewsletterTable={handleUpdateNewsletterTable}
                  member={member}
                  key={member._id}
                />
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center">
                {currentPage !== 1 && (
                  <button
                    className={`px-3 py-1 text-red`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    PREV
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={`mx-2 px-3 py-1 rounded-lg ${
                        pageNumber === currentPage
                          ? 'bg-red text-white cursor-not-allowed'
                          : 'text-red '
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {currentPage !== totalPages && (
                  <button
                    className={`px-3 py-1 text-red`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    NEXT
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Newsletter;
