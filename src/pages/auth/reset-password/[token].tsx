import Loading from '@/components/Loading';
import ResetPasswordForm from '@/components/signup/ResetPasswordForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResetPassword() {
  const [isValidToken, setIsValidToken] = useState(null);

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        console.log('tokehhj', token);
        const response = await fetch(`/api/auth/verifyToken?token=${token}`);
        const data = await response.json();
        setIsValidToken(data.isValidToken);
        console.log('isValidData', data);
      } catch (error) {
        console.error(error);
      }
    };
    verifyToken();
  }, [token]);

  if (isValidToken === null) {
    return (
      <div>
        <div className="bg-black w-full h-24 " />
        <div className="flex justify-center items-center w-full h-screen">
          <Loading />
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div>
        <div className="bg-black w-full h-24 " />
        <div className="p-24 text-red flex justify-center items-center">
          Invalid or expired token
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
