import { buttonStyleOutline } from '@/constants/styles';
import { currency } from '@/sections/PersonalInfo';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Loading from '@/components/Loading';
import { WalletDataProps } from '../Wallet';
import { UserDocument } from '@/models/user.model';

interface CreateWalletProps {
  onClose: () => void;
}

interface InputProps {
  amount: string;
  memberName: string;
}

function CreateWallet({ onClose }: CreateWalletProps) {
  const [input, setInput] = useState<InputProps>({
    amount: '',
    memberName: '',
  });
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [matchingMembers, setMatchingMembers] = useState<UserDocument[]>([]);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    try {
      if (!input.amount) {
        setError('Enter a valid amount');
        return;
      }
      if (!member) {
        setError('Select member name');
        return;
      }
      setLoading(true);
      // Make a POST request to the server to create wallet
      const response = await fetch(`/api/dashboard/wallets/${member._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        //throw error message
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

  const handleMemberNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    setInput((prev) => ({ ...prev, memberName: name }));
    if (name.length > 2) {
      // Query the data via API
      const response = await fetch(`/api/dashboard/members?search=${name}`);
      const data = await response.json();
      setMatchingMembers(data.members);
    } else {
      setMatchingMembers([]);
    }
  };

  const handleMemberSelect = (member: UserDocument) => {
    setMember(member);
    setInput((prev) => ({
      ...prev,
      memberName: `${member.surName} ${member.firstName}`,
    }));
    setMatchingMembers([]);
  };

  return (
    <div className="">
      <div className="flex md:flex-row gap-4 mb-4">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
          Create
        </h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold  text-red">
          Wallet
        </h2>
      </div>

      {error && <div className="text-red">{error}</div>}
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
        <div>
          <label
            htmlFor="member"
            className="block text-gray-700 font-bold mb-2"
          >
            Member name
          </label>
          <div className="relative mb-4 w-full md:w-96">
            <input
              type="text"
              id="memberName"
              name="memberName"
              value={input.memberName}
              className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Enter member name"
              autoComplete="off"
              onChange={handleMemberNameChange}
            />
            {matchingMembers.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-md shadow-lg bg-white divide-y divide-gray-200">
                {matchingMembers.map((member) => (
                  <div
                    key={member._id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMemberSelect(member)}
                  >
                    {member.surName} {member.firstName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <button
            disabled={loading}
            className={`${buttonStyleOutline} flex items-center`}
            onClick={handleCreate}
          >
            Create
          </button>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
