import { buttonStyleOutline } from '@/constants/styles';
import { currency } from '@/sections/PersonalInfo';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Loading from './Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { IUser } from '@/models/user.model';

interface FundwalletProps {
  onClose: () => void;
  fetchBalance: () => void;
  user: IUser;
}

function FundWallet({ onClose, fetchBalance, user }: FundwalletProps) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddFunds = async (transactionId: number) => {
    try {
      setLoading(true);
      // Make a POST request to the server to fund wallet
      const response = await fetch(`/api/account/wallet/fund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }),
      });
      if (!response.ok) {
        console.log(response);
      } else {
        onClose();
        fetchBalance();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { value } = e.target;
    setAmount(parseFloat(value));
  };

  const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

  const config = {
    public_key: apiKey || 'try',
    tx_ref: generateID(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: `${user.tel}`,
      name: user.surName + ' ' + user.firstName,
    },
    customizations: {
      title: 'Fund Wallet',
      description: 'Funding your Benin Club member',
      logo: '/images/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  function generateID() {
    return (
      'BENCLUB_tx_ref_' +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2)
    );
    // e.g. 'TRXkqjw1i7z6w29k3zqx8'
  }

  return (
    <div className="">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold  text-red">
          Fund
        </h2>
      </div>

      <div>
        <label htmlFor="amount" className="sr-only">
          Amount
        </label>
        <div className="flex items-center shadow-md rounded-md py-2 px-3 mb-4 w-full md:w-96">
          <span className="text-gray-500 mr-2">{currency}</span>
          <input
            type="number"
            id="amount"
            value={amount}
            className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Enter amount"
            onChange={handleChange}
          />
        </div>
        <div className="text-red my-2">{error || ''}</div>
        <div className="flex gap-8">
          <button
            disabled={loading}
            className={`${buttonStyleOutline} flex items-center`}
            onClick={() => {
              amount <= 0
                ? setError('Enter a valid amount')
                : handleFlutterPayment({
                    callback: async (response) => {
                      console.log(response);
                      closePaymentModal(); // this will close the modal programmatically
                      await handleAddFunds(response.transaction_id);
                    },
                    onClose: () => {},
                  });
            }}
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
