import Loading from '@/components/Loading';
import ForgetPasswordSuccess from '@/components/signup/ForgetPasswordSuccess';
import { buttonStyle } from '@/constants/styles';
import React, { useState } from 'react';

interface ResendPasswordProps {
  id: string;
}

export default function ResendPassword(props: ResendPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/resendlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Show success message
        setLoading(false);
        setEmailSent(true);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
      console.log(error);
    }
  };

  if (emailSent) return <ForgetPasswordSuccess email={email} />;

  return (
    <>
      <div className="h-20 w-full bg-black" />

      <div className="flex mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-20 mb-10 w-full">
        <div className="bg-white px-4 shadow-md rounded-lg md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <div className="flex md:flex-row gap-4 ">
              <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
                Forget
              </h2>
              <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
                Password
              </h2>
            </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ''}
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
              <div className="mr-4">{loading && <Loading />}</div>
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
        </div>
      </div>
    </>
  );
}
