import Loading from '@/components/Loading';
import { IUser } from '@/models/user.model';
import { IWallet } from '@/models/wallet.model';
import { useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaWallet,
  FaUniversity,
  FaEdit,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import SubscriptionTransaction from './SubscriptionTransaction';
import Image from 'next/image';

interface IFinancialInformationProps {
  user: IUser;
  handleUpdateMemberTable: () => void;
}

const FinancialInformation: React.FC<IFinancialInformationProps> = ({
  user,
  handleUpdateMemberTable,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const handleShowHistory = () => {
    setShowHistory(true);
  };
  const handleHideHistory = () => {
    setShowHistory(false);
  };
  return (
    <div className="bg-white px-8 pt-6 pb-8 mb-4 text-base">
      <h2 className="text-red text-xl mb-4">Financial Information</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="mb-4 -mt-8 col-span-2 shadow-md rounded-lg p-4">
          <p className="text-black">
            {user.firstName} {user.surName}{' '}
          </p>
        </div>
        <div className="mb-4 -mt-8 col-span-2 shadow-md rounded-lg p-4">
          <label className="block text-black font-bold mb-2">
            Last Payment Year
          </label>
          <p className="text-black">{user.lastPamentYear}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subscription Fee
          </label>
          <Input
            value={user.subcriptionFee}
            id={user._id}
            handleUpdateMemberTable={handleUpdateMemberTable}
            property="subcriptionFee"
          />
          {!showHistory && (
            <div
              className="text-red underline cursor-pointer"
              onClick={handleShowHistory}
            >
              View subscription history
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subscription Balance
          </label>
          <Input
            value={user.subcriptionBal}
            id={user._id}
            property="subcriptionBal"
            handleUpdateMemberTable={handleUpdateMemberTable}
            lastYear={user.lastPamentYear}
          />
        </div>
        {showHistory && (
          <div className="mb-4 -mt-8 col-span-2 shadow-md rounded-lg p-4">
            <SubscriptionTransaction
              id={user._id}
              onClose={handleHideHistory}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Entry Fee Payment
          </label>
          <Input
            value={user.entryFeePayment}
            id={user._id}
            property="entryFeePayment"
            handleUpdateMemberTable={handleUpdateMemberTable}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Entry Fee Balance
          </label>
          <Input
            value={user.entryFeeBal}
            id={user._id}
            handleUpdateMemberTable={handleUpdateMemberTable}
            property="entryFeeBal"
          />
        </div>
        {user?.payments?.length > 0 &&
          user.payments.map((image, index) => (
            <div key={index} className="relative w-48 h-48">
              <Image
                alt="payments"
                fill
                src={image}
                unoptimized
                className="object-contain"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FinancialInformation;

interface Props {
  value: number;
  property: string;
  id: string;
  lastYear?: number;
  handleUpdateMemberTable: () => void;
}

const Input = ({
  value = 0,
  property,
  id,
  handleUpdateMemberTable,
  lastYear,
}: Props) => {
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [year, setYear] = useState(lastYear || currentYear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };
  const handleMakePayment = () => {
    setPayment(true);
    setEditing(true);
  };

  const handleCloseEdit = () => {
    setPayment(false);
    setEditing(false);
  };
  const handleCheckClick = async () => {
    try {
      if (payment && inputValue > value) {
        setError(
          'You are making a payment higher than the subscription balance'
        );
        return;
      }
      setLoading(true);
      console.log({ [property]: inputValue });
      const response = await fetch(
        payment
          ? `/api/dashboard/members/subscription/${id}`
          : `/api/dashboard/members/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [property]: inputValue, // use dynamic key here,
            year,
          }),
        }
      );
      if (response.ok) {
        setEditing(false);
        setPayment(false);
        handleUpdateMemberTable();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError('Error updating value, try again');
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      {editing ? (
        <div>
          <div className="flex items-center">
            <input
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              type="number"
              name={property}
              placeholder="Amount"
              onChange={(e) => setInputValue(parseInt(e.target.value))}
              value={inputValue || ''}
            />
            {payment && (
              <input
                className="mt-1 block w-24 ml-4 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                type="number"
                name="year"
                placeholder="Year"
                onChange={(e) => setYear(parseInt(e.target.value))}
                value={year || ''}
              />
            )}
            {loading ? (
              <Loading />
            ) : (
              <div className="flex items-center">
                <FaTimes
                  className="bg-gray text-white rounded-md ml-2 h-10 w-10 p-2 cursor-pointer"
                  onClick={handleCloseEdit}
                />
                <FaCheck
                  className="bg-red text-white rounded-md ml-2 h-10 w-10 p-2 cursor-pointer"
                  onClick={handleCheckClick}
                />
              </div>
            )}
          </div>
          {error && <div className="text-red">{error}</div>}
        </div>
      ) : (
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-gray-700">&#x20a6;{value || 0}</p>
            <FaEdit
              className="hover:text-red cursor-pointer mx-8"
              onClick={handleEditClick}
            />
          </div>
          {property === 'subcriptionBal' && (
            <div
              className="text-red underline cursor-pointer"
              onClick={handleMakePayment}
            >
              Make payment
            </div>
          )}
        </div>
      )}
    </div>
  );
};
