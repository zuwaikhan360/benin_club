import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCar, FaPalette, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IVehicle } from '@/models/vehicle.model';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

type VehicleProps = IVehicle & {
  memberId: { surName: string; firstName: string };
};

const VehicleDetailsPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [vehicle, setVehicle] = useState<VehicleProps | null>(null);
  const [error, setError] = useState<string>('');
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`/api/dashboard/vehicles/show/${token}`);
        if (response.ok) {
          const vehicleData = await response.json();
          setVehicle(vehicleData);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        }
      } catch (error) {
        setError('Error fetching vehicle details');
      }
    };

    if (token && session?.user?.role === 'admin') {
      fetchVehicleDetails();
    }
  }, [token, session]);

  if (status === 'loading') {
    return (
      <>
        <div className="bg-black h-24 w-full" />
        <div className="flex items-center justify-center w-full h-screen">
          <Loading />
        </div>
      </>
    );
  }

  if (!session) {
    <>
      <div className="bg-black h-24 w-full" />
      <div className="flex flex-col items-center justify-center h-screen text-red">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Please sign in to access this page.</p>
      </div>
    </>;
  }

  if (error) {
    return (
      <>
        <div className="bg-black h-24 w-full" />
        <div className="flex flex-col items-center justify-center h-screen text-red">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <div className="bg-black h-24 w-full" />
        <div className="flex items-center justify-center w-full h-screen">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-black h-24 w-full" />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Vehicle Details</h1>
        <div className="flex items-center mb-4">
          <div className="w-48 h-48 relative rounded-full overflow-hidden mr-4">
            <Image
              src={vehicle.imageUrl}
              unoptimized
              alt="Vehicle Image"
              layout="fill"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{vehicle.carPlateNumber}</h2>
            <p className="text-gray-500">{vehicle.vehicleId}</p>
          </div>
        </div>
        <AnimatePresence>
          {!!vehicle && (
            <motion.div
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2"
            >
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-lg font-bold">
                  {vehicle.memberId.surName} {vehicle.memberId.firstName}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FaCar className="text-gray-500 mr-2" />
                <p className="text-lg font-bold">{vehicle.vehicleType}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaPalette className="text-gray-500 mr-2" />
                <p className="text-lg font-bold">{vehicle.vehicleColor}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaRegCalendarAlt className="text-gray-500 mr-2" />
                <p className="text-lg font-bold">{vehicle.regNumber}</p>
              </div>
              {/* Add more details as needed */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VehicleDetailsPage;
