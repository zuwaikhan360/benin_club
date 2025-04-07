import { buttonStyle, buttonStyleOutline } from "@/constants/styles";
import { Education, SectionProps } from "@/types/signup";
import React, { useState } from "react";

const SectionE = (props: SectionProps) => {
  const {
    setFormData,
    formData,
    onPrevious,
    onChange,
    onNext,
    error,
    handleError,
    isAdmin = false,
  } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    isAdmin ? onNext() : validation();
  };

  const validation = () => {
    let isValid = true;

    // add validation here
    if (!formData.proposerKnown) {
      handleError(
        "proposerKnown",
        "Please enter how long you have known the applicant and in what capacity"
      );
      isValid = false;
    }

    if (!formData.proposerPersonality) {
      handleError(
        "proposerPersonality",
        "Please comment on the candidate's personality with particular reference to his/her moral character, emotional stability, and physical stability"
      );
      isValid = false;
    }

    if (!formData.proposerName) {
      handleError("proposerName", "Please enter your proposer name");
      isValid = false;
    }

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Proposer</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-4">
            <label
              htmlFor="proposerName"
              className="block text-gray-700 font-medium mb-2"
            >
              Proposer Name
            </label>
            <input
              type="text"
              id="proposerName"
              name="proposerName"
              placeholder="Enter proposer name"
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.proposerName}
            />
            {error?.proposerName ? (
              <div className="text-red mt-2 text-sm">{error.proposerName}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="proposerPhone"
              className="block text-gray-700 font-medium mb-2"
            >
              Proposer Phone Number
            </label>
            <textarea
              id="proposerPhone"
              name="proposerPhone"
              placeholder=""
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.proposerPhone}
            />
            {error?.proposerPhone ? (
              <div className="text-red mt-2 text-sm">{error.proposerPhone}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          {isAdmin && (
            <div className="mb-4">
              <label
                htmlFor="proposerKnown"
                className="block text-gray-700 font-medium mb-2"
              >
                How long have you known the applicant and in what capacity?
              </label>
              <textarea
                id="proposerKnown"
                name="proposerKnown"
                placeholder=""
                className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                onChange={onChange}
                value={formData.proposerKnown}
              />
              {error?.proposerKnown ? (
                <div className="text-red mt-2 text-sm">
                  {error.proposerKnown}
                </div>
              ) : (
                <div className="h-5" />
              )}
            </div>
          )}

          {isAdmin && (
            <div className="mb-4">
              <label
                htmlFor="proposerPersonality"
                className="block text-gray-700 font-medium mb-2"
              >
                Please comment on the candidates personality with particular
                reference to his/her moral character, emotional stability and
                physical stability
              </label>
              <textarea
                id="proposerPersonality"
                name="proposerPersonality"
                placeholder=""
                className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                onChange={onChange}
                value={formData.proposerPersonality}
              />
              {error?.proposerPersonality ? (
                <div className="text-red mt-2 text-sm">
                  {error.proposerPersonality}
                </div>
              ) : (
                <div className="h-5" />
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="seconderName"
              className="block text-gray-700 font-medium mb-2"
            >
              Seconder Name
            </label>
            <input
              type="text"
              id="seconderName"
              name="seconderName"
              placeholder="Enter seconder name"
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              onChange={onChange}
              value={formData.seconderName}
            />
            {error?.seconderName ? (
              <div className="text-red mt-2 text-sm">{error.seconderName}</div>
            ) : (
              <div className="h-5" />
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-end ml-6 mt-4">
          <button
            className={buttonStyleOutline}
            onClick={onPrevious}
            disabled={props.loading}
          >
            Previous
          </button>
          <button type="submit" className={buttonStyle}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default SectionE;
