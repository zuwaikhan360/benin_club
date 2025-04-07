import { buttonStyleOutline } from '@/constants/styles';
import { currency } from '@/sections/PersonalInfo';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Loading from '@/components/Loading';
import { WalletDataProps } from '../Wallet';

interface FundwalletProps {
  onClose: () => void;
  member: WalletDataProps;
}

interface InputProps {
  amount: string;
  paymentMethod: string;
}

function FundWallet({ onClose, member }: FundwalletProps) {
  const [input, setInput] = useState<InputProps>({
    amount: '',
    paymentMethod: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddFunds = async () => {
    console.log(member);
    if (!input.amount) {
      setError('Enter a valid amount');
      return;
    }
    if (!input.amount) {
      setError('Enter a payment method');
      return;
    }

    try {
      setLoading(true);
      // Make a POST request to the server to fund wallet
      const response = await fetch(
        `/api/dashboard/wallets/fund/${member.userId._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        }
      );
      if (!response.ok) {
        console.log(response);
      } else {
        onClose();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold  text-red">
          Fund
        </h2>
      </div>
      <div className="my-4 flex flex-col items-end w-full">
        <div className="font-bold text-lg">
          {member.userId.surName} {member.userId.firstName}
        </div>
        <div className="text-lg">
          {currency}
          {member.balance}
        </div>
      </div>
      <div>
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <div className="flex items-center shadow-md rounded-md py-2 px-3 mb-4 w-full md:w-96">
          <span className="text-gray-500 mr-2">{currency}</span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={input.amount}
            className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Enter amount"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Payment Method
        </label>
        <div className="flex items-center shadow-md rounded-md py-2 px-3 mb-4 w-full md:w-96">
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={input.paymentMethod}
            className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Enter payment method"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-8">
          <button
            disabled={loading}
            className={`${buttonStyleOutline} flex items-center`}
            onClick={handleAddFunds}
          >
            Add Funds
            <HiOutlineArrowNarrowRight className="ml-2" />
          </button>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default FundWallet;
