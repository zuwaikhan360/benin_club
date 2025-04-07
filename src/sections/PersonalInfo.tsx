import ActivityHistory from '@/components/ActivityHistory';
import MemberDetails from '@/components/MemberDetails';
import SocialMedia from '@/components/SocialMedia';
import { activities } from '@/constants/activities';
import { membership } from '@/constants/membership';
import Image from 'next/image';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWallet,
  FaTimes,
  FaSave,
} from 'react-icons/fa';
import { IUser } from '@/models/user.model';
import { useEffect, useState } from 'react';
import ShowBioPopup from '@/components/ShowBioPopup';
import SocialMediaPopup from '@/components/SocialMediaPopup';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type PersonalInfoProps = {};

export default function PersonalInfo(props: PersonalInfoProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/account/wallet/balance');
      const { balance } = await response.json();
      setBalance(balance);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setBalance(0);
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <Loading />;
  }
  if (!session) {
    router.replace('/auth/signin');
    return null;
  }

  const { user } = session;

  return (
    <div className="flex flex-col md:flex-row bg-white ">
      {/* Left Column */}
      <div className="relative flex flex-col items-center  md:w-1/3 py-8">
        <div className="relative h-48 w-48">
          <Image
            src={user.image || '/images/profile.webp'}
            alt={user.firstName}
            fill
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
        <h1 className="text-2xl font-bold mt-4 uppercase">
          {user.firstName} {user.surName}
        </h1>
        <h2 className="text-sm font-bold text-red">{user.level}</h2>
        {/* Contact Button */}
        <div className="flex gap-3 items-center py-2 px-4 rounded-md shadow-md mb-4">
          <div className="text-xs ">Member ID:</div>
          <div className="bg-white text-red text-lg font-bold">
            {user.memberId}
          </div>
        </div>
        <ShowBioPopup bio={user.bio} step={step} setStep={setStep} />

        <SocialMediaPopup
          facebook={user?.socials?.facebook}
          twitter={user?.socials?.twitter}
          instagram={user?.socials?.instagram}
          linkedin={user?.socials?.linkedin}
          step={step}
        />
      </div>
      {/* Right Column */}
      <div className="flex flex-col md:w-2/3 py-8 px-8">
        {/* <Head>
          <title>{membershipProfile.name} | Club Membership Profile</title>
        </Head> */}

        {/* Personal Info */}
        <div className="mb-4 hidden md:block">
          <h1 className="text-2xl font-bold mt-4">
            {user.firstName} {user.surName}
          </h1>
          <h2 className="text-sm font-bold text-red"> {user.level}</h2>
        </div>
        <div className="flex items-center mb-4">
          <FaPhone className="mr-2" />
          <p>{user.tel}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <p>{user.address}</p>
        </div>

        {/* Wallet Section */}
        <div className="flex items-center mb-4">
          <FaWallet className="mr-2" />
          <p className="flex items-center">
            Wallet Balance:
            {loading ? (
              <Loading />
            ) : (
              <span className="text-red ml-2 font-bold">
                {currency}
                {balance || 0}
              </span>
            )}
            <Link
              href="/account/wallet"
              className="ml-2 underline text-red font-light text-sm"
            >
              View
            </Link>
          </p>
        </div>

        <MemberDetails membership={membership} user={user} />
        {/* <ActivityHistory activities={activities} /> */}
      </div>
    </div>
  );
}

export const currency = <span>&#x20a6;</span>;
