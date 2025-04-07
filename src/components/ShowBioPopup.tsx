import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Loading from './Loading';
import { useSession } from 'next-auth/react';

interface ShowBioPopupProps {
  bio: string;
  step: number;
  setStep: (step: number) => void;
}

function ShowBioPopup({ bio, step, setStep }: ShowBioPopupProps) {
  const [showBioPopup, setShowBioPopup] = useState<boolean>(false);
  const [editBio, setEditBio] = useState(false);
  const [newBio, setNewBio] = useState<string>(bio);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (!bio) {
      setShowBioPopup(true);
    } else {
      setStep(2);
    }
  }, [bio, setStep]);

  const handleSubmitBio = async () => {
    setError('');
    setLoading(true);
    const response = await fetch('/api/membership', {
      method: 'PUT',
      body: JSON.stringify({ bio: newBio }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      await update({ bio: newBio });
      handleCancel();
    } else {
      setError('Error saving form data');
    }
    setLoading(false);
  };
  const handleAddBios = () => {
    setEditBio(true);
    setShowBioPopup(true);
    setStep(1);
  };
  const handleCancel = () => {
    setShowBioPopup(false);
    setEditBio(false);
    setStep(2);
  };
  return (
    <div>
      {step === 1 && showBioPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div onClick={handleCancel} className="w-full flex justify-end">
              <FaTimes />
            </div>
            <h2 className="text-lg font-bold mb-2">Add Bio</h2>
            {editBio ? (
              <>
                <input
                  type="text"
                  className="w-full  p-2 border rounded-md mb-4"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
                {error && <div className="text-red">{error}</div>}
              </>
            ) : (
              <p className="mb-4">Please add a bio to your profile</p>
            )}
            <button
              className="bg-red text-white py-2 px-4 rounded-md hover:bg-white hover:text-red transition duration-300 ease-in-out"
              onClick={() => (editBio ? handleSubmitBio() : setEditBio(true))}
            >
              {loading ? <Loading /> : editBio ? 'Save' : 'Add Bio'}
            </button>
          </div>
        </div>
      )}
      <p
        className="text-sm text-center cursor-pointer px-4 mt-4"
        onClick={handleAddBios}
      >
        {bio || 'Click here to add your bio.'}
      </p>
    </div>
  );
}

export default ShowBioPopup;
