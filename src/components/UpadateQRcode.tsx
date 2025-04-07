'use client';
import { buttonStyle } from '@/constants/styles';
import { IVehicle } from '@/models/vehicle.model';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import QRCode from 'qrcode';
import { generateSecureCode } from './QRCodeGenerator';
import { compressImageUpload } from '@/utils/compressImage';
import Loading from './Loading';
import { UserDocument } from '@/models/user.model';

interface UpdateQRcodeProps {
  vehicle: IVehicle & {
    memberId: { firstName: string; surName: string; _id: string };
  };
  handleCloseModal: () => void;
}

const UpdateQRcode: React.FC<UpdateQRcodeProps> = ({
  vehicle,
  handleCloseModal,
}) => {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [error1, setError1] = useState<string>('');
  const [carPlateNumber, setCarPlateNumber] = useState(vehicle?.carPlateNumber);
  const [vehicleType, setVehicleType] = useState(vehicle?.vehicleType);
  const [vehicleColor, setVehicleColor] = useState(vehicle?.vehicleColor);
  const [memberName, setMemberName] = useState(
    vehicle.memberId
      ? vehicle?.memberId?.surName + ' ' + vehicle?.memberId?.firstName
      : ''
  );
  const [purposeOfVehicle, setPurposeOfVehicle] = useState(
    vehicle.purposeOfVehicle
  );
  const [regNumber, setRegNumber] = useState(vehicle.regNumber);
  const [imagePreview, setImagePreview] = useState(vehicle.imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchingMembers, setMatchingMembers] = useState<UserDocument[]>([]);
  const [member, setMember] = useState<any>(null);

  const handleMemberNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    setMemberName(name);
    if (name.length > 2) {
      // Query the data via API
      const response = await fetch(`/api/dashboard/members?search=${name}`);
      const data = await response.json();
      setMatchingMembers(data.members);
    } else {
      setMatchingMembers([]);
    }
  };

  const handleMemberSelect = (member: UserDocument) => {
    setMember(member);
    setMemberName(`${member.surName} ${member.firstName}`);
    setMatchingMembers([]);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target?.files?.[0];
      if (!file) return;
      setIsLoading(true);
      const compressedFile = await compressImageUpload(
        file,
        1024,
        imagePreview
      );
      if (!compressedFile) return;

      setImagePreview(compressedFile);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  console.log(vehicle);
  useEffect(() => {
    generateQRCode();
  }, [vehicle]);

  const generateQRCode = () => {
    const link = generateSecureCode(Math.random());
    QRCode.toDataURL('https://beninclub1931.com/' + vehicle.qrCodeUrl, {
      errorCorrectionLevel: 'H',
    })
      .then((dataUrl: string) => {
        setDataUrl(dataUrl);
        setError(null);
      })
      .catch((error: any) => {
        console.error(error);
        setError(error);
      });
  };

  const updateQRCode = async () => {
    if (!member) {
      setError1('Select a member name');
      return;
    }
    setLoading(true);
    const data = {
      carPlateNumber,
      vehicleType,
      vehicleColor,
      purposeOfVehicle,
      regNumber,
      imageUrl: imagePreview,
      memberId: member._id,
    };

    try {
      const response = await fetch(`/api/dashboard/vehicles/${vehicle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const dataUrl = await response.json();
        handleCloseModal();
        setLoading(false);
        setDataUrl(dataUrl.dataUrl);
      } else {
        setError(new Error(`Failed to update QR code: ${response.statusText}`));
      }
    } catch (error) {
      setLoading(false);
      setError(error as Error | null);
    }
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = vehicle.vehicleId;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col  mr-auto ">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 py-8 px-4 rounded-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <label htmlFor="url-input" className="text-lg font-medium">
            ID: {vehicle.vehicleId}
          </label>

          <div className="relative w-full">
            <input
              type="text"
              id="memberName"
              name="memberName"
              value={memberName}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
              placeholder="Enter member name"
              autoComplete="off"
              onChange={handleMemberNameChange}
            />
            {error1 && <div className="text-red">{error1}</div>}
            {matchingMembers?.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-md shadow-lg bg-white divide-y divide-gray-200">
                {matchingMembers.map((member) => (
                  <div
                    key={member._id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMemberSelect(member)}
                  >
                    {member.surName} {member.firstName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            id="car-plate-input"
            placeholder="Enter car plate number"
            value={carPlateNumber}
            onChange={(event) => setCarPlateNumber(event.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-type-input"
            value={vehicleType}
            onChange={(event) => setVehicleType(event.target.value)}
            placeholder="Enter vehicle type"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-color-input"
            value={vehicleColor}
            onChange={(event) => setVehicleColor(event.target.value)}
            placeholder="Enter vehicle color"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="vehicle-purpose-input"
            value={purposeOfVehicle}
            onChange={(event) => setPurposeOfVehicle(event.target.value)}
            placeholder="Enter purpose of vehicle"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
          />
          <input
            type="text"
            id="reg-number-input"
            value={regNumber}
            onChange={(event) => setRegNumber(event.target.value)}
            placeholder="Enter registration number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none  focus:border-red"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="text-lg font-medium">
              Upload vehicle image:
            </label>
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loading />
              </div>
            ) : imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Vehicle Preview"
                  className="w-64 h-64 object-contain mt-4"
                  width={250}
                  height={250}
                  unoptimized
                />
                <label htmlFor="image-upload">Change</label>
              </>
            ) : (
              <div className="w-64 h-64 border-2 border-gray-300 rounded-lg mt-4 flex items-center justify-center cursor-pointer">
                <label htmlFor="image-upload">
                  <FaUpload className="text-gray-500 text-4xl cursor-pointer" />
                </label>
              </div>
            )}
            <input
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              className="hidden"
            />
            {dataUrl && (
              <div>
                <Image
                  src={dataUrl}
                  alt="Vehicle Preview"
                  className="w-64 h-64 object-contain mt-4"
                  width={250}
                  height={250}
                  unoptimized
                />
                <button
                  className="p-2 border-2 rounded-lg m-4 border-red text-red"
                  onClick={downloadFile}
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loading />}
      <button onClick={updateQRCode} className={buttonStyle}>
        Update
      </button>
      {error && (
        <div className="text-red-500">{`Error generating QR code: ${error.message}`}</div>
      )}
    </div>
  );
};

export default UpdateQRcode;
