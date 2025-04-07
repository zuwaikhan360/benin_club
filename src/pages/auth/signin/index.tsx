import Loading from '@/components/Loading';
import LoginForm from '@/components/LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {}

const SignIn: React.FC<Props> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <>
        <div className="bg-black h-24 w-full" />
        <div className="w-full h-96 flex items-center justify-center">
          <Loading />
        </div>
      </>
    );
  }
  if (session) {
    router.replace('/account');
    return null;
  }
  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <LoginForm />
      </div>
    </>
  );
};

export default SignIn;
