import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PersonalInfo from "@/components/signup/PersonalInfo";
import StepsIndicator from "@/components/signup/StepsIndicator";
import { initialErrorData, initialFormData, steps } from "@/constants/signup";
import { ErrorData, FormData } from "@/types/signup";
import SectionB from "@/components/signup/SectionB";
import SectionC from "@/components/signup/SectionC";
import SectionD from "@/components/signup/SectionD";
import SectionE from "@/components/signup/SectionE";
import Declaration from "@/components/signup/Declaration";
import { NextPage } from "next";
import Loading from "@/components/Loading";
import { buttonStyle } from "@/constants/styles";
import UploadForm from "../signup/UploadForm";
import { IUser } from "@/models/user.model";

interface Props {
  onClose: () => void;
  id?: string;
}
const MembershipForm: NextPage<Props> = ({ onClose, id }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IUser>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorData>(initialErrorData);
  const [id2, setId] = useState(id || "");

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      if (!id) return;
      const response = await fetch(`/api/dashboard/members/${id}`);
      if (response.ok) {
        const savedData = await response.json();
        console.log("savedData", savedData);
        setFormData((prev) => ({ ...prev, ...savedData }));
        setStep(savedData.step);
      }
    };
    fetchSavedData();
  }, [id]);

  const handleSubmit = async () => {
    setError(initialErrorData);
    if (!formData.memberId) {
      handleError("memberId", "Enter member Id");
      return;
    }
    setLoading(true);
    const response = await fetch(`/api/dashboard/members`, {
      method: "POST",
      body: JSON.stringify({
        memberId: formData.memberId,
        category: formData.category,
        wifeId: formData.wifeId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const savedData = await response.json();
      console.log(savedData);
      setId(savedData._id);
      setFormData((prev) => ({ ...prev, ...savedData }));
      setStep(step + 1);
      setFormData({ ...formData, step: step + 1 });
    } else {
      handleError("general", "Error submitting form");
    }
    setLoading(false);
  };

  const handleNext = async () => {
    setError(initialErrorData);

    //save current step
    setLoading(true);
    const response = await fetch(`/api/dashboard/members/${id2}`, {
      method: "PUT",
      body: JSON.stringify(
        step === 7 ? { ...formData, signupStep: "Verification" } : formData
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      if (step === 7) return onClose();
      setStep(step + 1);
      setFormData({ ...formData, step: step + 1 });
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || "Error saving form data";
      handleError("general", errorMessage);
    }
    setLoading(false);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    handleError("general", "");
  };

  const handleError = (name: string, value: string) => {
    setError((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="w-full md:w-1/2 md:pr-2">
              <label
                htmlFor="memberId"
                className="block text-gray-700 font-medium mb-1"
              >
                Member ID
              </label>
              <input
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                type="text"
                name="memberId"
                onChange={handleChange}
                value={formData?.memberId || ""}
                onFocus={() => handleError("memberId", "")}
              />
              {error?.memberId ? (
                <div className="text-red text-sm">{error.memberId}</div>
              ) : (
                <div className="h-5" />
              )}
            </div>

            <div className="w-full md:w-1/2 md:pr-2">
              <label
                htmlFor="wifeId"
                className="block text-gray-700 font-medium mb-1"
              >
                Wife ID
              </label>
              <input
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                type="text"
                name="wifeId"
                onChange={handleChange}
                value={formData?.wifeId || ""}
                onFocus={() => handleError("wifeId", "")}
              />
              {error?.wifeId ? (
                <div className="text-red text-sm">{error.wifeId}</div>
              ) : (
                <div className="h-5" />
              )}
            </div>

            <div className="my-4">
              Category
              <select
                className="ml-2 border border-gray rounded-md py-1 px-2 text-sm"
                id="category"
                name="category"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="Member">Member</option>
                <option value="Corporate Member">Corporate Member</option>
                <option value="Old Member">Old Member</option>
                <option value="Deseased Member">Deseased Member</option>
                <option value="Transfered">Transfered</option>
                <option value="Live Member">Live Member</option>
                <option value="Honorary Member">Honorary Member</option>
              </select>
            </div>

            <div className="flex justify-end ml-6 mt-4">
              <button
                className={buttonStyle}
                onClick={id2 ? handleNext : handleSubmit}
                disabled={loading}
              >
                Next
              </button>
            </div>
          </>
        );

      case 1:
        return (
          <PersonalInfo
            formData={formData}
            error={error}
            setFormData={setFormData}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            isAdmin={true}
          />
        );

      case 2:
        return (
          <SectionB
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            setFormData={setFormData}
            onChange={handleChange}
            onNext={handleNext}
            isAdmin={true}
            handleError={handleError}
          />
        );
      case 3:
        return (
          <SectionC
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            isAdmin={true}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <SectionD
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            isAdmin={true}
            setFormData={setFormData}
          />
        );

      case 5:
        return (
          <SectionE
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            isAdmin={true}
            setFormData={setFormData}
          />
        );

      case 6:
        return (
          <UploadForm
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            isAdmin={true}
            setFormData={setFormData}
          />
        );

      case 7:
        return (
          <Declaration
            formData={formData}
            error={error}
            loading={loading}
            onPrevious={handlePrevious}
            onChange={handleChange}
            onNext={handleNext}
            handleError={handleError}
            setFormData={setFormData}
          />
        );
      // more form sections...
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-col w-full justify-center items-center ">
        <StepsIndicator
          currentStep={step}
          setCurrentStep={setStep}
          steps={[0, ...steps]}
          isAdmin={true}
        />
      </div>
      <div className="flex text-base  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-5 mb-10  w-full">
        <div className="bg-white px-4 md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          {renderStep()}
          <div className="flex flex-col w-full justify-center items-center">
            {error?.general ? (
              <div className="text-red text-sm">{error.general}</div>
            ) : (
              <div className="h-5" />
            )}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </>
  );
};
export default MembershipForm;
