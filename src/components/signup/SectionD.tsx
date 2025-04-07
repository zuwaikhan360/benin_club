import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { IWorkExperience } from '@/models/user.model';
import { Education, SectionProps, WorkExperience } from '@/types/signup';
import React, { useState, useEffect, useCallback } from 'react';

const SectionD = (props: SectionProps) => {
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

  const [educations, setEducations] = useState<Education[]>(
    formData.educations || [{ school: '', from: '', to: '', degree: '' }]
  );

  const [workExperiences, setWorkExperiences] = useState<IWorkExperience[]>(
    formData.workExperiences || [
      { from: '', to: '', employee: '', position: '', jobDescription: '' },
    ]
  );

  const updateFormdata = useCallback(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      educations,
      workExperiences,
    }));
  }, [educations, setFormData, workExperiences]);

  useEffect(() => {
    updateFormdata();
  }, [workExperiences, educations, updateFormdata]);

  const handleAddWorkExperience = () => {
    setWorkExperiences((prev) => [
      ...prev,
      {
        from: '',
        to: '',
        employee: '',
        position: '',
        jobDescription: '',
        isCurrentJob: false,
      },
    ]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof IWorkExperience,
    value: string | boolean
  ) => {
    setWorkExperiences(
      workExperiences.map((education, i) =>
        i === index ? { ...education, [field]: value } : education
      )
    );
    handleError('workExperiences', '');
  };

  const handleAddEducation = () => {
    setEducations((prev) => [
      ...prev,
      { school: '', from: '', to: '', degree: '' },
    ]);
    handleError('educations', '');
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setEducations(
      educations.map((education, i) =>
        i === index ? { ...education, [field]: value } : education
      )
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFormdata();
    isAdmin ? onNext() : validation();
  };
  const validation = () => {
    let isValid = true;

    // Validate education
    if (!formData.educations.length) {
      handleError(
        'educations',
        'Please enter at least one educational qualification'
      );
      isValid = false;
    } else {
      for (let i = 0; i < formData.educations.length; i++) {
        const education = formData.educations[i];
        if (
          !education.school ||
          !education.from ||
          !education.to ||
          !education.degree
        ) {
          handleError(
            'educations',
            `Please fill in all fields for educational qualification ${i + 1}`
          );
          isValid = false;
          break;
        }
      }
    }
    if (!formData.workExperiences.length) {
      handleError(
        'workExperiences',
        'Please enter at least one work experience'
      );
      isValid = false;
    } else {
      for (let i = 0; i < formData.workExperiences.length; i++) {
        const workExperience = formData.workExperiences[i];
        if (
          !workExperience.from ||
          (!workExperience.to && !workExperience.isCurrentJob) ||
          !workExperience.employee ||
          !workExperience.position ||
          !workExperience.jobDescription
        ) {
          handleError(
            'workExperiences',
            `Please fill in all fields for work experience ${i + 1}`
          );
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Educational Qualifications
          </h2>

          {error.educations ? (
            <div className="text-red mt-2 text-sm">{error.educations}</div>
          ) : (
            <div className="h-5" />
          )}

          {educations.map((education, index) => (
            <div
              key={index}
              className="relative border border-gray rounded-md p-4 mb-4"
            >
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className={'absolute top-2 right-2'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="#000000"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-medium mb-2">
                Qualification {index + 1}
              </h3>

              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="mb-4">
                  <label
                    htmlFor={`school-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    School Attended
                  </label>
                  <input
                    onFocus={() => handleError('educations', '')}
                    type="text"
                    id={`school-${index}`}
                    name={`school-${index}`}
                    placeholder="Enter school name"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleEducationChange(index, 'school', e.target.value)
                    }
                    value={education.school}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`date-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    From
                  </label>
                  <input
                    onFocus={() => handleError('educations', '')}
                    type="number"
                    id={`date-${index}`}
                    name={`date-${index}`}
                    placeholder="Year"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleEducationChange(index, 'from', e.target.value)
                    }
                    value={education.from}
                    min="1900" // Specify the minimum year
                    max="2099" // Specify the maximum year
                    step="1" // Specify the increment for year selection
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`date-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    To
                  </label>
                  <input
                    onFocus={() => handleError('educations', '')}
                    type="number"
                    id={`date-${index}`}
                    name={`date-${index}`}
                    placeholder="Year"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleEducationChange(index, 'to', e.target.value)
                    }
                    value={education.to}
                    min="1900" // Specify the minimum year
                    max="2099" // Specify the maximum year
                    step="1" // Specify the increment for year selection
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`degree-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Qualifications Obtained
                  </label>
                  <input
                    onFocus={() => handleError('educations', '')}
                    type="text"
                    id={`degree-${index}`}
                    name={`degree-${index}`}
                    placeholder="Enter degree obtained"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleEducationChange(index, 'degree', e.target.value)
                    }
                    value={education.degree}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className={buttonStyleOutline}
          >
            Add Qualification
          </button>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

          {error.workExperiences ? (
            <div className="text-red mt-2 text-sm">{error.workExperiences}</div>
          ) : (
            <div className="h-5" />
          )}

          {workExperiences.map((workExperience, index) => (
            <div
              key={index}
              className="relative border border-gray rounded-md p-4 mb-4"
            >
              <button
                type="button"
                onClick={() => handleRemoveWorkExperience(index)}
                className={'absolute top-2 right-2'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="#000000"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-medium mb-2">
                Experience {index + 1}
              </h3>

              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="mb-4">
                  <label
                    htmlFor={`date-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    From
                  </label>
                  <input
                    onFocus={() => handleError('workExperience', '')}
                    type="number"
                    id={`from-${index}`}
                    name={`from-${index}`}
                    placeholder="Year"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleWorkExperienceChange(index, 'from', e.target.value)
                    }
                    value={workExperience.from}
                  />
                </div>

                {!workExperience.isCurrentJob && (
                  <div className="mb-4">
                    <label
                      htmlFor={`to-${index}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      To
                    </label>
                    <input
                      onFocus={() => handleError('woworkExperiences', '')}
                      type="number"
                      id={`to-${index}`}
                      name={`to-${index}`}
                      placeholder="Year"
                      className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                      onChange={(e) =>
                        handleWorkExperienceChange(index, 'to', e.target.value)
                      }
                      value={workExperience.to}
                    />
                  </div>
                )}

                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    id={`isCurrentJob-${index}`}
                    name={`isCurrentJob-${index}`}
                    className="mr-2 hidden"
                    checked={workExperience.isCurrentJob}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'isCurrentJob',
                        e.target.checked
                      )
                    }
                  />

                  <div
                    className={`border-2 border-gray h-4 w-4 mx-2 ${
                      workExperience.isCurrentJob ? 'border-red bg-red' : ''
                    }`}
                  ></div>
                  <label
                    htmlFor={`isCurrentJob-${index}`}
                    className="whitespace-nowrap"
                  >
                    Current Job
                  </label>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`employee-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Employee
                  </label>
                  <input
                    onFocus={() => handleError('workExperiences', '')}
                    type="text"
                    id={`employee-${index}`}
                    name={`employee-${index}`}
                    placeholder="Enter employee name"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'employee',
                        e.target.value
                      )
                    }
                    value={workExperience.employee}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`position-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Position
                  </label>
                  <input
                    onFocus={() => handleError('educations', '')}
                    type="text"
                    id={`position-${index}`}
                    name={`position-${index}`}
                    placeholder="Enter position occupied"
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'position',
                        e.target.value
                      )
                    }
                    value={workExperience.position}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`jobDescription-${index}`}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Job Description
                  </label>
                  <input
                    onFocus={() => handleError('workExperiences', '')}
                    type="text"
                    id={`jobDescription-${index}`}
                    name={`jobDescription-${index}`}
                    placeholder="Enter job description "
                    className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'jobDescription',
                        e.target.value
                      )
                    }
                    value={workExperience.jobDescription}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWorkExperience}
            className={buttonStyleOutline}
          >
            Add Experience
          </button>
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
        </div>
      </form>
    </div>
  );
};
export default SectionD;
