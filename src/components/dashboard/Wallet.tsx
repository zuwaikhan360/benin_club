import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Loading from "../Loading";
import WalletRow from "./WalletRow";
import { buttonStyle } from "@/constants/styles";
import Modal from "../Modal";
import CreateWallet from "./wallet/CreateWallet";

export type WalletDataProps = {
  _id: string;
  balance: number;
  userId: {
    _id: string;
    firstName: string;
    surName: string;
  };
};
type FetchWalletDataProps = {
  query: string;
  page: number;
};

const Wallet = () => {
  const [walletData, setWalletData] = useState<WalletDataProps[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchWalletData = useCallback(
    async ({ query, page }: FetchWalletDataProps) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/dashboard/wallets?page=${page}&pageSize=${pageSize}&search=${query}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch wallet data.");
        }
        const { filteredWalletData, totalWallets } = await response.json();
        setWalletData(filteredWalletData);
        setTotalPages(Math.ceil(totalWallets / pageSize));
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      setIsLoading(false);
    },
    [pageSize]
  );

  useEffect(() => {
    fetchWalletData({ query: "", page: currentPage });
  }, [currentPage, fetchWalletData, pageSize]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateWalletTable = () => {
    fetchWalletData({ query: "", page: currentPage });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    fetchWalletData({ query: searchTerm, page: 1 });
  };

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateWalletTable();
  };

  const onOpen = () => {
    console.log("hello");
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
        <button className={buttonStyle} onClick={onOpen}>
          Create
        </button>
      </div>

      <Modal isOpen={showModal} onClose={onClose}>
        <CreateWallet onClose={onClose} />
      </Modal>
      {error && <div className="text-red"> {error}</div>}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : walletData.length === 0 ? (
        <div>No data found.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="v">
                <th className="py-2 px-4 text-left">Member Name</th>
                <th className="py-2 px-4 text-left">Wallet Balance</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {walletData.map((member) => (
                <WalletRow
                  handleUpdateWalletTable={handleUpdateWalletTable}
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
                          ? "bg-red text-white cursor-not-allowed"
                          : "text-red "
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

export default Wallet;
