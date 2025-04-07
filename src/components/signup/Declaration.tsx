import { buttonStyle } from '@/constants/styles';
import { SectionProps } from '@/types/signup';
import React, { useState } from 'react';
import CheckBox from '../CheckBox';

const Declaration = (props: SectionProps) => {
  const { onNext } = props;
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmed) {
      onNext();
    }
  };

  const handleCheckboxChange = () => {
    setConfirmed(!confirmed);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Declaration</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-justify">
            We hereby declare that the particulars which have been supplied are
            true to the best of our knowledge and belief. We understand and
            accept that withholding any information requested or giving false
            information in this form may render the applicant ineligible for
            admission into the CLUB or automatically disqualify the applicant
            from membership if admitted. The applicants shall regard themselves
            bound by the rules and regulations of the CLUB in so far as they
            affect them.
          </p>
          <div className="mt-4">
            <CheckBox
              label="
                I confirm that the above information is true to the best of my
                knowledge and belief."
              onChange={handleCheckboxChange}
              value={confirmed}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-end ml-6 mt-4">
          <button type="submit" className={buttonStyle} disabled={!confirmed}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Declaration;
