import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { IUser } from '@/models/user.model';
import { bankDetails } from '@/constants/bank';
import Link from 'next/link';
import Image from 'next/image';
import { compressImageUpload } from '@/utils/compressImage';

interface ClubFeeProps {
  user: IUser;
}

const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

const ClubFee: NextPage<ClubFeeProps> = ({ user }) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentTroubleVisible, setIsPaymentTroubleVisible] = useState(false);
  const [image, setImage] = useState('');

  const config = {
    public_key: apiKey || 'try',
    tx_ref: generateID(),
    amount: user.entryFeePayment,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: `${user.tel}`,
      name: user.surName + ' ' + user.firstName,
    },
    customizations: {
      title: 'Benin Club 1931',
      description: 'Entry fee payment',
      logo: 'https://www.beninclub1931.com//api/images/image1690495346262.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSbmit = async (transactionId: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/payment/clubfee', {
        method: 'POST',
        body: JSON.stringify({ transactionId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        await update({ signupStep: 'ConfirmPayment' });
        console.log(response);
        router.push('/account');
        setLoading(false);
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

  function generateID() {
    return (
      'BENCLUB_tx_ref_' +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2)
    );
    // e.g. 'TRXkqjw1i7z6w29k3zqx8'
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setImageLoading(true);
        const compressedFile = await compressImageUpload(file, 1024, image);
        const response = await fetch('/api/auth/payment/transfer', {
          method: 'POST',
          body: JSON.stringify({ image: compressedFile }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          await update({ signupStep: 'Completed' });
          setImage(compressedFile);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        }
        setImageLoading(false);
      } catch (error) {}
    }
  };

  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        {/* <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red to-pink text-white"> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaCheckCircle className="text-6xl mb-4" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold mb-8"
        >
          Congratulations!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mb-6 text-center max-w-md"
        >
          Your profile has been verified by the admin. You can now proceed to
          pay the membership fee to become an official member of our club.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-4 px-8 bg-red text-white font-bold rounded-lg shadow-md hover:bg-white hover:text-red  transition-colors duration-300"
          onClick={() =>
            handleFlutterPayment({
              callback: async (response) => {
                console.log(response);
                if (
                  response.status === 'completed' ||
                  response.status === 'successful'
                ) {
                  closePaymentModal(); // this will close the modal programmatically
                  await handleSbmit(response.transaction_id);
                }
              },
              onClose: () => {},
            })
          }
        >
          Pay Membership Fee
        </motion.button>

        {!isPaymentTroubleVisible && (
          <div className="tet-red my-2">{error || ''}</div>
        )}
        <motion.button
          // Your motion animation properties here
          className="my-4   text-red hover:underline cursor-pointer "
          onClick={() => setIsPaymentTroubleVisible((prev) => !prev)}
        >
          Having Trouble Making Payment?
        </motion.button>
        {isPaymentTroubleVisible && (
          <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
            {/* Section for Account Details and Instructions */}
            <h2 className="text-xl font-semibold mb-4">
              Account Details for Payment:
            </h2>
            <table className="w-full my-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Bank Name</th>
                  <th className="py-2 px-4 text-left">Account Number</th>
                  <th className="py-2 px-4 text-left">Account Name</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map((bank, index) => (
                  <tr key={index} className="bg-white">
                    <td className="py-2 px-4">{bank.bankName}</td>
                    <td className="py-2 px-4">{bank.accountNumber}</td>
                    <td className="py-2 px-4">{bank.accountName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-600 mb-2">
              Please upload proof of payment or email it to{' '}
              <Link
                href="mailto: info@beninclub1931.com"
                className="text-red underline"
              >
                info@beninclub1931.com
              </Link>
            </p>
            <div className="mt-4">
              <label htmlFor="proofOfPayment" className="block font-semibold">
                Upload Proof of Payment:
              </label>
              <input
                type="file"
                id="proofOfPayment"
                name="proofOfPayment"
                accept=".jpg, .jpeg, .png, .pdf"
                className="mt-1 w-full"
                onChange={handleFileUpload}
              />
            </div>
            {imageLoading && <Loading />}
            {image && (
              <>
                <div className="relative mt-4 h-72 w-48">
                  <Image
                    src={image}
                    fill
                    alt="payment"
                    unoptimized
                    className="object-cover mx-auto"
                  />
                </div>
                <p>
                  Receipt sent to support. Once confirmed, an email will be sent
                  to you confirming your account activation.
                </p>
              </>
            )}
            {isPaymentTroubleVisible && (
              <div className="tet-red">{error || ''}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ClubFee;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (session.user.signupStep !== 'ClubPayment') {
    return {
      redirect: {
        destination: '/about',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};
