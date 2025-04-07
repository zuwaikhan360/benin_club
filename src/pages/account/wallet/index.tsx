import { useEffect, useState } from 'react';
import Head from 'next/head';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { currency } from '@/sections/PersonalInfo';
import Modal from '@/components/Modal';
import FundWallet from '@/components/FundWallet';
import Loading from '@/components/Loading';
import { TransactionDocument } from '@/models/transaction.model';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const WalletPage = () => {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingT, setLoadingT] = useState(true);
  const [transactions, setTransactions] = useState<TransactionDocument[]>([]);
  const [refresh, setRefresh] = useState(true);

  const { data: session, status, update } = useSession();

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [refresh]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/account/wallet/balance');
      const { balance } = await response.json();
      setBalance(balance);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setBalance(0);
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoadingT(true);
      const response = await fetch('/api/account/wallet/transactions');
      const { transactions } = await response.json();
      setTransactions(transactions);
      setLoadingT(false);
    } catch (error) {
      console.log(error);
      setLoadingT(false);
    }
  };

  const onOpen = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  if (status === 'loading') {
    return <Loading />;
  }
  if (!session) {
    router.replace('/auth/signin');
    return null;
  }

  const { user } = session;

  return (
    <>
      <div className="bg-black h-24 w-full" />

      <div className="mx-auto lg:max-w-7xl px-4 md:px-8 my-10 w-full">
        <Head>
          <title>My Wallet</title>
        </Head>

        <div className="bg-red text px-4 py-6 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 uppercase text-white">
            My wallet
          </h1>
          <div className="bg-white rounded-lg py-6 px-8 flex flex-col md:flex-row justify-around items-center">
            <div className="flex flex-col justify-center items-center mb-4 md:mb-0">
              {loading ? (
                <p>
                  <Loading />
                </p>
              ) : (
                <p className="text-4xl md:text-6xl font-bold mb-0">
                  {currency}
                  {balance || 0}
                </p>
              )}
              <p className="text-sm">Your current wallet balance</p>
            </div>
            <button className={buttonStyle} onClick={onOpen}>
              Fund wallet
            </button>
          </div>
        </div>
        <Modal isOpen={showModal} onClose={onClose}>
          <FundWallet
            onClose={onClose}
            fetchBalance={handleRefresh}
            user={user}
          />
        </Modal>

        <div className="bg-white shadow-lg rounded-md p-4 mt-4">
          <div className="flex md:flex-row gap-4 ">
            <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
              Transaction
            </h2>
            <h2 className="text-2xl md:text-4xl uppercase font-bold  text-red">
              History
            </h2>
          </div>

          <ul>
            {loadingT ? (
              <div className="w-full flex justify-center items-center">
                <Loading />
              </div>
            ) : !transactions.length ? (
              <div className="w-full flex justify-center items-center">
                No transaction history found
              </div>
            ) : (
              transactions.map((transaction) => (
                <li
                  className="flex items-center mb-4 justify-between"
                  key={transaction._id}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 ${
                        transaction.type === 'debit' ? 'bg-red' : 'bg-green'
                      } rounded-full flex-shrink-0 mr-4`}
                    ></div>
                    <div>
                      <p className="text-gray">{transaction.description}</p>
                      <p className="text-sm text-gray-400">
                        {moment(transaction.createdAt).format(
                          'h:sa, Do MMM YY'
                        )}
                      </p>
                    </div>
                  </div>
                  <p
                    className={
                      transaction.status === 'Completed'
                        ? 'text-green'
                        : transaction.status === 'Pending'
                        ? 'text-yellow'
                        : 'text-red'
                    }
                  >
                    {transaction.status}
                  </p>
                  <p className=" font-semibold">
                    {transaction.type === 'debit' ? '-' : '+'}
                    {transaction.amount}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
