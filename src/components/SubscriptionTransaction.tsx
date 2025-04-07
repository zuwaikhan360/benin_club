import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { TransactionData } from './dashboard/Transaction';
import { FaTimes } from 'react-icons/fa';
import { currency } from '@/sections/PersonalInfo';

interface SubscriptionTransactionProps {}
function SubscriptionTransaction({}: SubscriptionTransactionProps) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/account/subscription/transactions`);
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

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <div className=" font-bold uppercase text-lg">Subscription History</div>
      </div>
      <table className="w-full whitespace-nowrap text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Invoice ID
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Year
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Description
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Payment Method
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Amount
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Status
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-red">{error}</div>
        ) : !transactions.length ? (
          <div className="my-3 ml-4">No subscription history</div>
        ) : (
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white">
                <td className="px-4 py-2">{transaction.invoiceId}</td>

                <td className="px-4 py-2">
                  {transaction?.meta?.lastPamentYear}
                </td>
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
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default SubscriptionTransaction;
