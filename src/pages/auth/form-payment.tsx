import { buttonStyle } from '@/constants/styles';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { IUser } from '@/models/user.model';
import { useSession } from 'next-auth/react';

interface Props {
  user: IUser;
}
const Page: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

  const config = {
    public_key: apiKey || 'try',
    tx_ref: generateID(),
    amount: 5000,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: `${user.tel}`,
      name: user.surName + ' ' + user.firstName,
    },
    customizations: {
      title: 'Benin Club 1931',
      description: 'Payment for registration form',
      logo: 'https://www.beninclub1931.com//api/images/image1690495346262.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSbmit = async (transactionId: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/payment', {
        method: 'POST',
        body: JSON.stringify({ transactionId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        await update({ signupStep: 'ProfileCreation' });
        console.log(response);
        router.push('/auth/signup/form');
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

  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div
        className="h-screen w-full flex flex-col  items-center
       p-4 "
      >
        <div className="border border-red rounded-md bg-red bg-opacity-10 p-4 my-16 ">
          <div className="font-medium text-sm">PAYMENT INFORMATION SUMMARY</div>
          <ul className="text-sm">
            <li>Total Joining Fee = NGN 1,000,000.00</li>
            <li>Joining Form Fee = NGN 5,000.00</li>
            <li>Joining Completion Fee = NGN 995,000.00</li>
          </ul>
        </div>
        <h1 className="text-2xl font-bold mb-4">Registration Form Payment</h1>
        <p className="text-lg mb-2">Payment Amount: NGN {config.amount}</p>
        <p className="text-sm text-gray-600 mb-4">
          This payment is for the registration form. Please note that the fee is
          non-refundable.
        </p>
        <button
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
          className={buttonStyle}
        >
          Make Payment
        </button>
        <div className="mt-8">{loading && <Loading />}</div>
        {error && (
          <p className="text-red-500 mt-4">
            Payment Error: {error}. Please try again later.
          </p>
        )}
      </div>
    </>
  );
};

export default Page;

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

  if (session.user.signupStep !== 'Payment') {
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
