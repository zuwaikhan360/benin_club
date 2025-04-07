import RegistrationCompleted from '@/components/RegistrationSuccess';
import { SuccessAnimation } from '@/components/signup/VerificationSuccess';
import { motion } from 'framer-motion';
import React from 'react';
import { IUser } from '@/models/user.model';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

interface Props {}
export default function Success() {
  const { data: session, status, update } = useSession();
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
  if (session.user.signupStep !== 'Verification') {
    router.replace('/');
    return null;
  }
  const { user } = session;
  console.log(user);
  return (
    <>
      <div className="h-20 w-full bg-black" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center w-full max-w-3xl p-4 mx-4 rounded-lg shadow-lg bg-white">
            <SuccessAnimation />
            <h2 className="mt-4 mb-2 text-2xl font-bold text-center">
              Registration Completed
            </h2>
            <RegistrationCompleted
              name={user.firstName + ' ' + user.surName}
              verificationTime="2 to 3 days"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
