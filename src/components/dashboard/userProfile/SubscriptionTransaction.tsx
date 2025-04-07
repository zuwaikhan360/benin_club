import React, { useEffect, useState } from 'react';
import { TransactionData } from '../Transaction';
import Loading from '@/components/Loading';
import moment from 'moment';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { currency } from '@/sections/PersonalInfo';

interface SubscriptionTransactionProps {
  id: string;
  onClose: () => void;
}
function SubscriptionTransaction({
  id,
  onClose,
}: SubscriptionTransactionProps) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dashboard/members/subscription/${id}`);
      if (!response.ok) {
        throw new Error('Unable to fetch wallet data.');
      }
      const { transactions } = await response.json();
      setTransactions(transactions);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteTransaction = async (id: string) => {
    setIsLoadingDelete(true);
    const res = await fetch(`/api/dashboard/transactions/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    }
    setIsLoadingDelete(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-lg uppercase font-bold">Subscription History</div>
        <FaTimes onClick={onClose} className="cursor-pointer" />
      </div>
      <table className="w-full whitespace-nowrap text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Invoice ID
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Date
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Payment Year
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Description
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Payment Method
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Amount
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Status
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="text-red">{error}</div>
          ) : !transactions.length ? (
            <div className="my-4 ml-4">No subscription history</div>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white">
                <td className="px-4 py-2">{transaction.invoiceId}</td>

                <td className="px-4 py-2">
                  {moment(transaction.createdAt).format('h:sa, Do MMM YY')}
                </td>
                <td>{transaction.meta?.lastPamentYear || '2023'}</td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2">{transaction.paymentMethod}</td>
                <td className="px-4 py-2">
                  {currency}
                  {transaction.amount}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.status === 'Completed'
                      ? 'text-green'
                      : transaction.status === 'Pending'
                      ? 'text-yellow'
                      : 'text-red'
                  }`}
                >
                  {transaction.status}
                </td>
                <td className="px-4 py-2 text-red">
                  <FaTrash
                    onClick={() => deleteTransaction(transaction._id)}
                    className="text-red cursor-pointer"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionTransaction;
