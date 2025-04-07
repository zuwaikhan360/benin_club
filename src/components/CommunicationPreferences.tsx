import React from 'react';

interface CommunicationPreferencesProps {
  isSubscribedToEmails: boolean;
  setIsSubscribedToEmails: React.Dispatch<React.SetStateAction<boolean>>;
  isSubscribedToNotifications: boolean;
  setIsSubscribedToNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({
  isSubscribedToEmails,
  setIsSubscribedToEmails,
  isSubscribedToNotifications,
  setIsSubscribedToNotifications,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
      <h2 className="text-xl font-medium mb-4">Communication Preferences</h2>
      <p className="mb-2">
        How would you like to receive notifications?
        <br />
        <small className="text-gray-500 text-sm">
          We&apos;ll send you notifications for important updates, such as new
          messages, friend requests, and other platform activity.
        </small>
      </p>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="subscribed-to-emails"
          checked={isSubscribedToEmails}
          onChange={() => setIsSubscribedToEmails(!isSubscribedToEmails)}
          className="mr-2"
        />
        <span className="text-gray-500 font-medium">Receive emails</span>
      </label>
      <small className="text-gray-500 text-sm mb-4 block">
        If this option is selected, we&apos;ll send you email notifications for
        important updates.
      </small>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="subscribed-to-notifications"
          checked={isSubscribedToNotifications}
          onChange={() =>
            setIsSubscribedToNotifications(!isSubscribedToNotifications)
          }
          className="mr-2"
        />
        <span className="text-gray-500 font-medium">
          Receive push notifications
        </span>
      </label>
      <small className="text-gray-500 text-sm">
        If this option is selected, we&apos;ll send you push notifications for
        important updates.
      </small>
    </div>
  );
};

export default CommunicationPreferences;
