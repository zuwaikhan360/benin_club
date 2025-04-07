import { buttonStyle } from '@/constants/styles';
import React, { useState } from 'react';
import Loading from '../Loading';

interface ResendPasswordProps {
  id: string;
  email: string;
}

export default function ResendPassword(props: ResendPasswordProps) {
  const { id, email } = props;
  const [email1, setEmail1] = useState(email);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/members/email/resendlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, email: email1 }),
      });

      const data = await response.json();
      setLoading(false);

      //   setMessage(data.message);
      //   setValues(initialValues);
      setEmail1('');
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
      console.log(error);
    }
  };

  return (
    <div className="text-base">
      <h2 className="text-2xl font-bold mb-4">Resend password Link</h2>
      <div className="flex flex-wrap mb-4 ">
        <div className="w-full md:w-1/2 md:pr-2">
          <label
            htmlFor="memberId"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="memberId"
            placeholder="Enter email"
            onChange={(e) => setEmail1(e.target.value)}
            value={email1 || ''}
            onFocus={() => setError('')}
          />
          {error ? (
            <div className="text-red text-sm">{error}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>
      <div className="flex justify-end ml-6 mt-4">
        {loading && <Loading />}
        <button
          className={buttonStyle}
          onClick={handleSubmit}
          disabled={loading}
        >
          Send reset email
        </button>
      </div>
      <div className="text-red">{error}</div>
    </div>
  );
}
