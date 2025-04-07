import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { NextPage } from 'next';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

const Proccessing: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return (
      <>
        <div className="h-20 w-full bg-black" />
        <div className="w-full flex h-96 items-center justify-center">
          <Loading />
        </div>
      </>
    );
  }
  if (!session) {
    router.replace('/auth/signin');
    return null;
  }
  if (session.user.signupStep !== 'ConfirmPayment') {
    router.replace('/');
    return null;
  }
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
          <FaCheckCircle className="text-6xl mb-4 text-red" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold mb-8 uppercase "
        >
          Creating your account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mb-6 text-center max-w-md"
        >
          Please wait while we create your account. We are processing your
          information and setting up your profile. This may take a few minutes,
          but we appreciate your patience.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mb-6 text-center max-w-md"
        >
          In the meantime, you can explore our website and learn more about what
          our service has to offer. If you have any questions or need
          assistance, don&apos;t hesitate to reach out to our support team at{' '}
          <a href="mailto:info@example.com">info@example.com</a>.
        </motion.p>
      </div>
    </>
  );
};

export default Proccessing;
