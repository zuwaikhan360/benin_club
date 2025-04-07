import React from 'react';

interface PrivacySettingsProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
  isVisibleToFriends: boolean;
  setIsVisibleToFriends: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  isPublic,
  setIsPublic,
  isVisibleToFriends,
  setIsVisibleToFriends,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
      <h2 className="text-xl font-medium mb-4">Privacy Settings</h2>
      <p className="mb-2">
        Who can view your profile?
        <br />
        <small className="text-gray-500 text-sm">
          Your profile includes your name, profile picture, bio, and other
          personal information.
        </small>
      </p>
      <label className="block mb-2">
        <input
          type="radio"
          name="privacy"
          value="public"
          checked={isPublic}
          onChange={() => setIsPublic(true)}
          className="mr-2"
        />
        <span className="text-red-500 font-medium">Public</span>
      </label>
      <small className="text-gray-500 text-sm mb-4 block">
        Anyone on the internet can see your profile and its contents.
      </small>
      <label className="block mb-2">
        <input
          type="radio"
          name="privacy"
          value="friends"
          checked={!isPublic}
          onChange={() => setIsPublic(false)}
          className="mr-2"
        />
        <span className="text-red-500 font-medium">Friends only</span>
      </label>
      <small className="text-gray-500 text-sm mb-4 block">
        Only your friends on this platform can see your profile and its
        contents.
      </small>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="visible-to-friends"
          checked={isVisibleToFriends}
          onChange={() => setIsVisibleToFriends(!isVisibleToFriends)}
          className="mr-2"
        />
        <span className="text-gray-500 font-medium">
          Allow friends to see your online status
        </span>
      </label>
      <small className="text-gray-500 text-sm">
        If this option is selected, your friends will be able to see if
        you&apos;re currently online.
      </small>
    </div>
  );
};

export default PrivacySettings;
