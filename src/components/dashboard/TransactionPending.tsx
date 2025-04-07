import { TransactionDocument } from "@/models/transaction.model";
import { currency } from "@/sections/PersonalInfo";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Loading from "../Loading";

interface TransactionProps {}

export interface TransactionData {
  [key: string]: any;
  description: string;
  amount: number;
  bal: number;
  status: "Pending" | "Completed" | "Failed";
  invoiceId: string;
  userId: {
    _id: string;
    firstName: string;
    surName: string;
  };
  paymentMethod: string;
  type: "credit" | "debit";
  reference: string;
  initiatedBy: {
    _id: string;
    firstName: string;
    surName: string;
  };
}

function TransactionPending(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/dashboard/wallets/transactions-pending"
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setTransactions(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setTransactions([]);
      setError("Problem fetching transactions");
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleUpdateTransactionsTable = async () => {
    const response = await fetch("/api/dashboard/wallets/transactions-pending");
    const data = await response.json();
    setTransactions(data);
  };

  // Define a function to update the transaction status
  async function updateTransactionStatus(id: string, status: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/dashboard/wallets/transactions-pending/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Error updating transaction status");
      }
      fetchEvents();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // Filtering transactions based on search query

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = transactions.filter((transaction) => {
      const invoiceId = `${transaction.invoiceId}`.toLowerCase();
      return invoiceId.includes(searchTerm);
    });
    setFilteredTransactions(filtered);
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Sorting transactions based on sortConfig
  const sortedTransactions = [...currentTransactions];
  if (sortConfig.key) {
    sortedTransactions.sort((a, b) => {
      if (sortConfig.key === "status") {
        switch (a.status) {
          case "Completed":
            return sortConfig.direction === "asc" ? -1 : 1;
          case "Pending":
            return sortConfig.direction === "asc" ? -1 : 1;
          case "Failed":
            return sortConfig.direction === "asc" ? -1 : 1;
          default:
            return 0;
        }
      }
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTransactions.length / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (key: string, defaultDirection: string = "asc") => {
    let direction = defaultDirection;
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction, status: sortConfig.status });
  };

  const renderSortArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transactions</h3>
        <div />
        {/* <button className="px-3 py-2 bg-red text-white rounded-md hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
          Add TransactionPending
        </button> */}
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={handleSearch}
        />
      </div>

      <table className="w-full whitespace-nowrap text-sm">
        <thead className="w-full">
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("invoiceId", "asc")}
            >
              Invoice ID {renderSortArrow("invoiceId")}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("memberName", "asc")}
            >
              Member Name {renderSortArrow("memberName")}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("date", "asc")}
            >
              Date {renderSortArrow("date")}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("description", "asc")}
            >
              Description {renderSortArrow("description")}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("paymentMethod", "asc")}
            >
              Payment Method {renderSortArrow("paymentMethod")}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort("amount", "asc")}
            >
              Amount {renderSortArrow("amount")}
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Status
              <select
                className="ml-2 border border-gray rounded-md py-1 px-2 text-sm"
                onChange={(e) =>
                  setSortConfig({
                    key: "status",
                    direction: sortConfig.direction,
                    status: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-red">{error}</div>
        ) : !transactions.length ? (
          <div className="my-4 ml-4">No Pending Transactions</div>
        ) : (
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white">
                <td className="px-4 py-2">{transaction.invoiceId}</td>
                <td className="px-4 py-2">
                  {transaction.userId?.surName} {transaction.userId?.firstName}
                </td>
                <td className="px-4 py-2">
                  {moment(transaction.createdAt).format("h:sa, Do MMM YY")}
                </td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2">{transaction.paymentMethod}</td>
                <td className="px-4 py-2">
                  {currency}
                  {transaction.amount}
                </td>{" "}
                <td
                  className={`px-4 py-2 ${
                    transaction.status === "Completed"
                      ? "text-green"
                      : transaction.status === "Pending"
                      ? "text-yellow"
                      : "text-red"
                  }`}
                >
                  {transaction.status}
                </td>
                <td className="px-4 py-2">
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <button className="mr-2 text-green  hover:text-yellow focus:outline-none">
                        <FaCheck
                          onClick={() =>
                            updateTransactionStatus(
                              transaction._id,
                              "Completed"
                            )
                          }
                        />
                      </button>
                      <button className="mr-2  text-red hover:text-yellow focus:outline-none">
                        <FaTimes
                          onClick={() =>
                            updateTransactionStatus(
                              transaction._id,
                              "Completed"
                            )
                          }
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="flex justify-start items-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === number ? "bg-red text-white" : "bg-white text-red"
            }`}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TransactionPending;
