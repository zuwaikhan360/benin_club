import { Membership } from '@/types/membership';
import { FaCreditCard, FaRegCalendarAlt, FaRegNewspaper } from 'react-icons/fa';
import moment from 'moment';
import { IUser } from '@/models/user.model';
import { currency } from '@/sections/PersonalInfo';
import Modal from './Modal';
import { useState } from 'react';
import SubscriptionTransaction from './SubscriptionTransaction';

interface MemberDetailsProps {
  membership: Membership;
  user: IUser;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ membership, user }) => {
  const [showHistory, setshowHistory] = useState(false);
  const formattedJoinDate = moment(user.joinDate).format('MMM DD, YYYY');
  const formattedRenewalDate = moment(membership.renewalDate).format(
    'MMM DD, YYYY'
  );

  const onOpen = () => {
    setshowHistory(true);
  };
  const onClose = () => {
    setshowHistory(false);
  };
  return (
    <div className="flex flex-col border-t border-gray pt-8">
      <h2 className="text-lg font-medium mb-4">Member Details</h2>
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            user.status === 'Active' ? 'bg-green' : 'bg-red'
          } mr-2`}
        ></div>
        <p>{user.status} Member</p>
      </div>
      <div className="flex items-center mb-4">
        <FaRegCalendarAlt className="mr-2" />
        <p>Joined on {formattedJoinDate}</p>
      </div>
      <div className="mb-4">
        <div className="flex items-center ">
          <FaRegNewspaper className="mr-2" />

          <p>
            Subscription:{' '}
            {user.subcriptionBal ? (
              <span className="text-red">
                {' '}
                -{currency}
                {user.subcriptionBal}
              </span>
            ) : (
              <span className="text-green">Subscribed</span>
            )}
          </p>
        </div>
        <div
          className="text-red underline font-light text-sm cursor-pointer"
          onClick={onOpen}
        >
          View subscription history
        </div>
      </div>
      <div className="flex items-center mb-4">
        <p>Membership Level: {user.level}</p>
      </div>
      <Modal isOpen={showHistory} onClose={onClose}>
        <SubscriptionTransaction />
      </Modal>
    </div>
  );
};

export default MemberDetails;
