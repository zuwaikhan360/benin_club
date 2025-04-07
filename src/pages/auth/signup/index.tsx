import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import VerificationSuccess from '@/components/signup/VerificationSuccess';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

interface Props {
  sent: boolean;
}
const SignUp: NextPage<Props> = ({ sent }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(sent);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
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
      setError('Something went wrong, pls try again later');
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="h-24 w-full bg-black" />
      {!emailSent ? (
        <div className="flex mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-20 mb-10 w-full">
          <div className="bg-white px-4 shadow-md rounded-lg md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="flex md:flex-row gap-4 ">
                <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
                  Sign
                </h2>
                <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
                  Up
                </h2>
              </div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                type="email"
                name="email"
                onChange={onChange}
                value={email}
                onFocus={() => setError('')}
              />
              {error ? (
                <div className="text-red text-sm mt-1">{error}</div>
              ) : (
                <div className="text-gray-500 text-sm mt-1">
                  Please enter your email to receive a verification email.
                </div>
              )}
              <div className="flex justify-end ml-6 mt-4">
                <button
                  className={loading ? buttonStyleOutline : buttonStyle}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full justify-center items-center mt-4">
              {loading && <Loading />}
            </div>
            <div className="text-gray text-sm mt-1 flex items-center gap-2 ">
              <span>How to join Benin Club.</span>
              <BsInfoCircle
                className="cursor-pointer"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                How to Join Benin Club
              </h2>
              <p className="mb-4">
                We&apos;re thrilled that you&apos;re interested in becoming a
                member of Benin Club. Our membership process is designed to be
                straightforward and hassle-free. Here&apos;s a step-by-step
                guide to help you get started:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Obtain and Fill the Membership Form:</strong> Begin by
                  visiting our official website or our physical office to obtain
                  the membership application form. Read the instructions
                  carefully and complete the form with accurate details.
                </li>
                <li className="mb-2">
                  <strong>Pay the Non-Refundable Form Fee:</strong> As part of
                  the application process, you&apos;ll need to pay a
                  non-refundable form fee of NGN5000. This fee covers
                  administrative expenses for processing your application.
                </li>
                <li className="mb-2">
                  <strong>Submit the Completed Form and Payment Proof:</strong>{' '}
                  After filling out the form, submit it along with the payment
                  proof through the specified channels. You can either do this
                  in person at our office or online via our portal.
                </li>
                <li className="mb-2">
                  <strong>Balance Payment and Confirmation:</strong> Once your
                  application is reviewed and approved, you&apos;ll receive a
                  confirmation email along with details about the balance
                  payment. The balance payment amounts to NGN995,000.
                </li>
                <li className="mb-2">
                  <strong>Membership Confirmation:</strong> Upon receiving your
                  balance payment, our team will process your membership.
                  You&apos;ll then be inducted and officially welcomed as a
                  member of Benin Club, complete with a membership card and
                  access to exclusive benefits.
                </li>
              </ol>
              <p>
                If you have any questions or need assistance at any point in the
                process, please don&apos;t hesitate to reach out to our customer
                support team. We look forward to having you as a valued member
                of our community!
              </p>
            </div>
          </Modal>
        </div>
      ) : (
        <VerificationSuccess email={email} />
      )}
    </>
  );
};

SignUp.getInitialProps = async ({ query }: NextPageContext) => {
  const { emailSent } = query;

  return { sent: emailSent ? true : false };
};
export default SignUp;
