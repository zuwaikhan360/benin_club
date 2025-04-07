import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';

const PersonalInfo = (props: SectionProps) => {
  const {
    formData,
    onChange,
    onNext,
    error,
    handleError,
    setFormData,
    isAdmin = false,
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      let updatedBusiness = { ...prevFormData.business };
      let updatedHome = { ...prevFormData.home };
      let updatedPermanent = { ...prevFormData.permanent };
      let updatedOccupation = { ...prevFormData.occupation };

      if (name === 'address') {
        updatedHome = { ...updatedHome, address: value };
      } else if (name === 'tel') {
        updatedHome = { ...updatedHome, tel: value };
      } else if (name === 'permanentAddress') {
        updatedPermanent = { ...updatedPermanent, address: value };
      } else if (name === 'permanentAddressTel') {
        updatedPermanent = { ...updatedPermanent, tel: value };
      } else if (name === 'occupationAddress') {
        updatedOccupation = { ...updatedOccupation, address: value };
      } else if (name === 'occupationTel') {
        updatedOccupation = { ...updatedOccupation, tel: value };
      } else if (name === 'businessAddress') {
        updatedBusiness = { ...updatedBusiness, address: value };
      } else if (name === 'businessTel') {
        updatedBusiness = { ...updatedBusiness, tel: value };
      }

      return {
        ...prevFormData,
        home: updatedHome,
        permanent: updatedPermanent,
        occupation: updatedOccupation,
        business: updatedBusiness,
      };
    });
    handleError('general', '');
  };

  const handleNext = () => {
    let isValid = true;
    if (!formData?.surName) {
      handleError('surName', 'Please enter your surname');
      isValid = false;
    }
    if (!formData?.firstName) {
      handleError('firstName', 'Please enter your first name');
      isValid = false;
    }
    if (!formData?.dob) {
      handleError('dob', 'Please enter your date of birth');
      isValid = false;
    }
    if (!formData?.nationality) {
      handleError('nationality', 'Please enter your nationality');
      isValid = false;
    }
    if (!formData?.address) {
      handleError('address', 'Please enter your home address');
      isValid = false;
    }
    if (!formData?.tel) {
      handleError('tel', 'Please enter your home telephone number');
      isValid = false;
    }
    if (!formData?.permanent.address) {
      handleError('permanentAddress', 'Please enter your permanent address');
      isValid = false;
    }
    if (!formData?.permanent.tel) {
      handleError(
        'permanentAddressTel',
        'Please enter your permanent address telephone number'
      );
      isValid = false;
    }
    if (!formData?.occupation.address) {
      handleError('occupation', 'Please enter your occupation');
      isValid = false;
    }
    if (!formData?.occupation.tel) {
      handleError(
        'occupationTel',
        'Please enter your occupation telephone number'
      );
      isValid = false;
    }
    if (!formData?.employer) {
      handleError('employer', 'Please enter your employer');
      isValid = false;
    }
    if (!formData?.business.address) {
      handleError('businessAddress', 'Please enter your business address');
      isValid = false;
    }
    if (!formData?.business.tel) {
      handleError(
        'businessAddressTel',
        'Please enter your business address telephone number'
      );
      isValid = false;
    }
    if (!formData?.nameOfBankers) {
      handleError('nameOfBankers', 'Please enter the name of your bankers');
      isValid = false;
    }

    // If there are no errors, call onNext
    if (isValid) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personal information</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 md:pr-2">
          <label
            htmlFor="surName"
            className="block text-gray-700 font-medium mb-1"
          >
            Surname
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="surName"
            onChange={onChange}
            value={formData?.surName || ''}
            onFocus={() => handleError('surName', '')}
          />
          {error?.surName ? (
            <div className="text-red text-sm">{error.surName}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-1"
          >
            First Name
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="firstName"
            onChange={onChange}
            value={formData?.firstName || ''}
            onFocus={() => handleError('firstName', '')}
          />
          {error?.firstName ? (
            <div className="text-red text-sm">{error.firstName}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 md:pr-2">
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-1">
            Date of Birth
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="date"
            name="dob"
            onChange={onChange}
            value={formData?.dob || ''}
            onFocus={() => handleError('dob', '')}
          />
          {error?.dob ? (
            <div className="text-red text-sm">{error.dob}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="nationality"
            className="block text-gray-700 font-medium mb-1"
          >
            Nationality
          </label>
          <input
            className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="nationality"
            onChange={onChange}
            value={formData?.nationality || ''}
            onFocus={() => handleError('nationality', '')}
          />
          {error?.nationality ? (
            <div className="text-red text-sm">{error.nationality}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-1"
          >
            Home Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="address"
            onChange={onChange}
            value={formData.address || ''}
            onFocus={() => handleError('address', '')}
          />
          {error?.address ? (
            <div className="text-red text-sm">{error.address}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label htmlFor="tel" className="block text-gray-700 font-medium mb-1">
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="number"
            name="tel"
            onChange={onChange}
            value={formData.tel || ''}
            onFocus={() => handleError('tel', '')}
          />
          {error?.tel ? (
            <div className="text-red text-sm">{error.tel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="permanentAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Permanent Home Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="permanentAddress"
            onChange={handleChange}
            value={formData.permanent.address || ''}
            onFocus={() => handleError('permanentAddress', '')}
          />
          {error?.permanentAddress ? (
            <div className="text-red text-sm">{error.permanentAddress}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="permanentAddressTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="number"
            name="permanentAddressTel"
            onChange={handleChange}
            value={formData.permanent.tel || ''}
            onFocus={() => handleError('permanentAddressTel', '')}
          />
          {error?.permanentAddressTel ? (
            <div className="text-red text-sm">{error.permanentAddressTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="occupation"
            className="block text-gray-700 font-medium mb-1"
          >
            Occupation
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="occupationAddress"
            onChange={handleChange}
            value={formData.occupation.address || ''}
            onFocus={() => handleError('occupation', '')}
          />
          {error?.occupation ? (
            <div className="text-red text-sm">{error.occupation}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="occupationTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="number"
            name="occupationTel"
            onChange={handleChange}
            value={formData.occupation.tel || ''}
            onFocus={() => handleError('occupationTel', '')}
          />
          {error?.occupationTel ? (
            <div className="text-red text-sm">{error.occupationTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="employer"
          className="block text-gray-700 font-medium mb-1"
        >
          Employer
        </label>
        <input
          className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
          type="text"
          name="employer"
          onChange={onChange}
          value={formData?.employer || ''}
          onFocus={() => handleError('employer', '')}
        />
        {error?.employer ? (
          <div className="text-red text-sm">{error.employer}</div>
        ) : (
          <div className="h-5" />
        )}
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-2/3 md:pr-2">
          <label
            htmlFor="bussinessAddress"
            className="block text-gray-700 font-medium mb-1"
          >
            Business Address
          </label>
          <input
            className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="text"
            name="businessAddress"
            onChange={handleChange}
            value={formData.business.address || ''}
            onFocus={() => handleError('businessAddress', '')}
          />
          {error?.businessAddress ? (
            <div className="text-red text-sm">{error.businessAddress}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <label
            htmlFor="businessTel"
            className="block text-gray-700 font-medium mb-1"
          >
            Tel
          </label>
          <input
            className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
            type="number"
            name="businessTel"
            onChange={handleChange}
            value={formData.business.tel || ''}
            onFocus={() => handleError('businessAddressTel', '')}
          />
          {error?.businessAddressTel ? (
            <div className="text-red text-sm">{error.businessAddressTel}</div>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="nameOfBankers"
          className="block text-gray-700 font-medium mb-1"
        >
          Name of Bankers
        </label>
        <input
          className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
          type="text"
          name="nameOfBankers"
          onChange={onChange}
          value={formData?.nameOfBankers || ''}
          onFocus={() => handleError('nameOfBankers', '')}
        />
        {error?.nameOfBankers ? (
          <div className="text-red text-sm">{error.nameOfBankers}</div>
        ) : (
          <div className="h-5" />
        )}
      </div>
      <div className="flex justify-end ml-6 mt-4">
        <button
          className={buttonStyle}
          onClick={() => (isAdmin ? onNext() : handleNext())}
          disabled={props.loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
