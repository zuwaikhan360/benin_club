import { SectionProps } from '@/types/signup';
import CheckBox from '../CheckBox';
import CustomRadio from './CustomRadio';
import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import { fieldVariants } from '@/utils/motion';
import { motion } from 'framer-motion';

const SectionB = (props: SectionProps) => {
  const {
    formData,
    onPrevious,
    onChange,
    onNext,
    error,
    handleError,
    isAdmin = false,
  } = props;
  const handleNext = () => {
    if (isAdmin) {
      onNext();
      return;
    }

    let isValid = true;

    // Validate employment status
    if (!formData.employed) {
      handleError(
        'employed',
        'Please select whether you are self-employed or not.'
      );
      isValid = false;
    }

    // Validate marriage status and wife's name (if applicable)
    if (!formData.married) {
      handleError('married', 'Please select whether you are married or not.');
      isValid = false;
    } else if (formData.married === 'Yes' && !formData.wife) {
      handleError('wife', "Please enter your wife's full name.");
      isValid = false;
    }

    // Validate Nigerian citizenship
    if (!formData.isNigeria) {
      handleError(
        'isNigeria',
        'Please select whether you are a Nigerian or not.'
      );
      isValid = false;
    }

    // Validate club member relative
    if (!formData.clubMemberRelative) {
      handleError(
        'clubMemberRelative',
        'Please select whether any club member is your relative or not.'
      );
      isValid = false;
    }

    // Validate dependent relative in Benin
    if (!formData.dependentRelativeBenin) {
      handleError(
        'dependentRelativeBenin',
        'Please select whether you have any dependent relative in Benin or not.'
      );
      isValid = false;
    }

    // Validate permanent residence in Benin
    if (!formData.residePermanentlyBenin) {
      handleError(
        'residePermanentlyBenin',
        'Please select whether you reside permanently in Benin or not.'
      );
      isValid = false;
    }

    // Validate membership of any other club
    if (!formData.otherClubMember) {
      handleError(
        'otherClubMember',
        'Please select whether you are a member of any other club or not.'
      );
      isValid = false;
    }

    // Validate playing any sport
    if (!formData.playSport) {
      handleError(
        'playSport',
        'Please select whether you play any sport or not.'
      );
      isValid = false;
    }

    // Validate known ailment
    if (!formData.knownAilment) {
      handleError(
        'knownAilment',
        'Please select whether you have any known ailment or not.'
      );
      isValid = false;
    }

    // Validate transfer out of Benin
    if (!formData.transferOutOfBenin) {
      handleError(
        'transferOutOfBenin',
        'Please select whether you can be transferred out of Benin or not.'
      );
      isValid = false;
    }

    // Validate charged with criminal offense
    if (!formData.chargedWithCriminalOffense) {
      handleError(
        'chargedWithCriminalOffense',
        'Please select whether you have ever been charged with a criminal offense or not.'
      );
      isValid = false;
    } else if (
      formData.chargedWithCriminalOffense === 'Yes' &&
      !formData.criminalOffenseDetails
    ) {
      handleError(
        'criminalOffenseDetails',
        'Please provide details of the criminal offense.'
      );
      isValid = false;
    }

    // If all validations pass, proceed to the next section
    if (isValid) {
      onNext();
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="flex-1">
          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex">
              <label className="block text-gray-700 font-medium mr-4">
                Are you self employed?
              </label>
              <CustomRadio
                name="employed"
                value="Yes"
                checked={formData?.employed === 'Yes'}
                onChange={onChange}
              />
              <CustomRadio
                name="employed"
                value="No"
                checked={formData?.employed === 'No'}
                onChange={onChange}
              />
            </div>
            {error?.employed ? (
              <div className="text-red text-sm">{error.employed}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex">
              <label className="block text-gray-700 font-medium mr-4">
                Are you married?
              </label>
              <CustomRadio
                name="married"
                value="Yes"
                checked={formData?.married === 'Yes'}
                onChange={onChange}
              />
              <CustomRadio
                name="married"
                value="No"
                checked={formData?.married === 'No'}
                onChange={onChange}
              />
            </div>
            {error?.married ? (
              <div className="text-red text-sm">{error.married}</div>
            ) : (
              <div className="h-5" />
            )}
            {formData.married === 'Yes' && (
              <>
                <input
                  className="mt-1 block w-full  rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
                  type="text"
                  name="wife"
                  placeholder="Enter wife full name"
                  onChange={onChange}
                  value={formData.wife || ''}
                  onFocus={() => handleError('address', '')}
                />
                {error?.wife ? (
                  <div className="text-red text-sm">{error.wife}</div>
                ) : (
                  <div className="h-5" />
                )}
              </>
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex">
              <label className="block text-gray-700 font-medium mr-4">
                Are you a Nigerian?
              </label>
              <CustomRadio
                name="isNigeria"
                value="Yes"
                checked={formData?.isNigeria === 'Yes'}
                onChange={onChange}
              />
              <CustomRadio
                name="isNigeria"
                value="No"
                checked={formData?.isNigeria === 'No'}
                onChange={onChange}
              />
            </div>
            {error?.isNigeria ? (
              <div className="text-red text-sm">{error.isNigeria}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4 ">
                Is any club member your relative?
              </label>
              <div className="flex">
                <CustomRadio
                  name="clubMemberRelative"
                  value="Yes"
                  checked={formData?.clubMemberRelative === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="clubMemberRelative"
                  value="No"
                  checked={formData?.clubMemberRelative === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.clubMemberRelative ? (
              <div className="text-red text-sm">{error.clubMemberRelative}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Do you have any dependent relative in Benin?
              </label>
              <div className="flex">
                <CustomRadio
                  name="dependentRelativeBenin"
                  value="Yes"
                  checked={formData?.dependentRelativeBenin === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="dependentRelativeBenin"
                  value="No"
                  checked={formData?.dependentRelativeBenin === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.dependentRelativeBenin ? (
              <div className="text-red text-sm">
                {error.dependentRelativeBenin}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>
          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Do you reside permanently in Benin?
              </label>
              <div className="flex">
                <CustomRadio
                  name="residePermanentlyBenin"
                  value="Yes"
                  checked={formData?.residePermanentlyBenin === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="residePermanentlyBenin"
                  value="No"
                  checked={formData?.residePermanentlyBenin === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.residePermanentlyBenin ? (
              <div className="text-red text-sm">
                {error.residePermanentlyBenin}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Are you a member of any other club?
              </label>
              <div className="flex">
                <CustomRadio
                  name="otherClubMember"
                  value="Yes"
                  checked={formData?.otherClubMember === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="otherClubMember"
                  value="No"
                  checked={formData?.otherClubMember === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.otherClubMember ? (
              <div className="text-red text-sm">{error.otherClubMember}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Do you play any sport?
              </label>
              <div className="flex">
                <CustomRadio
                  name="playSport"
                  value="Yes"
                  checked={formData?.playSport === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="playSport"
                  value="No"
                  checked={formData?.playSport === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.playSport ? (
              <div className="text-red text-sm">{error.playSport}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Do you have any known ailment?
              </label>
              <div className="flex">
                <CustomRadio
                  name="knownAilment"
                  value="Yes"
                  checked={formData?.knownAilment === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="knownAilment"
                  value="No"
                  checked={formData?.knownAilment === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.knownAilment ? (
              <div className="text-red text-sm">{error.knownAilment}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Can you be transferred out of Benin?
              </label>
              <div className="flex">
                <CustomRadio
                  name="transferOutOfBenin"
                  value="Yes"
                  checked={formData?.transferOutOfBenin === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="transferOutOfBenin"
                  value="No"
                  checked={formData?.transferOutOfBenin === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.transferOutOfBenin ? (
              <div className="text-red text-sm">{error.transferOutOfBenin}</div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>

          <motion.div className="mb-6">
            <div className="flex flex-wrap">
              <label className="block text-gray-700 font-medium mr-4">
                Have you ever been charged with a criminal offense?
              </label>
              <div className="flex">
                <CustomRadio
                  name="chargedWithCriminalOffense"
                  value="Yes"
                  checked={formData?.chargedWithCriminalOffense === 'Yes'}
                  onChange={onChange}
                />
                <CustomRadio
                  name="chargedWithCriminalOffense"
                  value="No"
                  checked={formData?.chargedWithCriminalOffense === 'No'}
                  onChange={onChange}
                />
              </div>
            </div>
            {error?.chargedWithCriminalOffense ? (
              <div className="text-red text-sm">
                {error.chargedWithCriminalOffense}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>
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
        <button
          className={buttonStyle}
          onClick={handleNext}
          disabled={props.loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionB;
