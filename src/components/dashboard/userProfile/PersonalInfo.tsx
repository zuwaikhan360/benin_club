import { FaUser, FaBirthdayCake, FaPhone, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { IUser } from '@/models/user.model';

interface PersonalInformationProps {
  user: IUser;
}

const PersonalInfo: React.FC<PersonalInformationProps> = ({ user }) => {
  return (
    <div className="bg-white px-8 pt-6 pb-8 mb-4 text-base">
      <h2 className="text-red text-xl mb-4">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          <div className="w-24 h-24 relative">
            <Image
              src={user.image}
              alt="Avatar"
              layout="fill"
              objectFit="contain"
              unoptimized
            />
          </div>
          <div>
            <span className="font-bold">ID: </span>
            {user.memberId}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Last Name</label>
          <p className="text-black">{user.surName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">First Name</label>
          <p className="text-black">{user.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Wife</label>
          <p className="text-black">
            {user.wife} | {user.wifeId}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">
            Date of Birth
          </label>
          <p className="text-black">{user.dob}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">
            Phone Number
          </label>
          <p className="text-black">{user.tel}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Email</label>
          <p className="text-black">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Nationality</label>
          <p className="text-black">{user.nationality}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">
            Permanent Address
          </label>
          <p className="text-black">{user.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Occupation</label>
          <span className="text-black">{user.occupation?.address}</span> |{' '}
          <span className="text-black">{user.occupation?.tel}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
