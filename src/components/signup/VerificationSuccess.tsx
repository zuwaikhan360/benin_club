import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import React from 'react';

export const SuccessAnimation = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-32 w-32 rounded-full bg-red"
      animate={{ scale: [1, 1.2, 1.2, 1], rotate: [270, 270, 0, 0] }}
      transition={{ duration: 2 }}
    >
      <FiCheckCircle size={48} className="text-white" />
    </motion.div>
  );
};

interface VerificationSuccessProps {
  email: string;
}

const VerificationSuccess = (props: VerificationSuccessProps) => {
  const { email } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <div className="bg-black h-24 w-full" /> */}
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center w-full max-w-lg p-4 mx-4 rounded-lg shadow-lg bg-white">
          <SuccessAnimation />
          <h2 className="mt-4 mb-2 text-2xl font-bold text-center">
            Verification email sent!
          </h2>
          <p className="text-gray-600 text-center">
            We have sent a verification email to the email address you provided{' '}
            <span>{email}</span>. Please check your inbox and follow the
            instructions in the email to complete the signup process.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationSuccess;
