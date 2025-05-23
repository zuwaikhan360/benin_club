import { IUser } from '@/models/user.model';
import { ErrorData } from '@/types/signup';

export const steps = [1, 2, 3, 4, 5, 6, 7];
const contact = { address: '', tel: '' };
const socials = { facebook: '', twitter: '', instagram: '', linkedin: '' };
export const initialFormData: IUser = {
  step: 1,
  memberId: '',
  email: '',
  surName: '',
  firstName: '',
  wife: '',
  gender: 'Male',
  position: 'Member',
  subcriptionFee: 0,
  role: 'member',
  signupStep: 'ProfileCreation',
  subcriptionBal: 0,
  category: 'Member',
  wifeId: '',
  dob: '',
  nationality: '',
  home: contact,
  permanent: contact,
  entryFeePayment: 0,
  entryFeeBal: 0,
  address: '',
  image: '',
  status: 'Inactive',
  level: 'Member',
  joinDate: new Date(),
  tel: 0,
  occupation: contact,
  occupationTel: 0,
  employer: '',
  business: contact,
  nameOfBankers: '',
  employed: '',
  married: '',
  isNigeria: '',
  clubMemberRelative: '',
  dependentRelativeBenin: '',
  residePermanentlyBenin: '',
  otherClubMember: '',
  playSport: '',
  knownAilment: '',
  transferOutOfBenin: '',
  chargedWithCriminalOffense: '',
  marriageDuration: 0,
  numberOfChildren: 0,
  children: [],
  addressYears: 0,
  emergencyContact: '',
  disability: '',
  sportSection: ['Darts', 'Squash'],
  reasonToJoin: '',
  tribe: '',
  numberOfWives: 0,
  educations: [],
  workExperiences: [],
  proposerPersonality: '',
  proposerKnown: '',
  proposerPhone: '',
  bio: '',
  socials: socials,
  proposerName: '',
  seconderName: '',
  payments: [],
};

export const initialErrorData: ErrorData = {
  memberId: '',
  general: '',
  email: '',
  surName: '',
  firstName: '',
  dob: '',
  nationality: '',
  permanentAddress: '',
  permanentAddressTel: '',
  occupation: '',
  occupationTel: '',
  employer: '',
  businessAddress: '',
  category: '',
  businessAddressTel: '',
  nameOfBankers: '',
  wife: '',
  wifeId: '',
  address: '',
  tel: '',
  employed: '',
  married: '',
  isNigeria: '',
  clubMemberRelative: '',
  dependentRelativeBenin: '',
  residePermanentlyBenin: '',
  otherClubMember: '',
  playSport: '',
  knownAilment: '',
  transferOutOfBenin: '',
  chargedWithCriminalOffense: '',
  marriageDuration: '',
  numberOfChildren: '',
  children: '',
  addressYears: '',
  emergencyContact: '',
  disability: '',
  image: '',
  sportSection: '',
  reasonToJoin: '',
  tribe: '',
  numberOfWives: '',
  educations: '',
  workExperiences: '',
  proposerPersonality: '',
  proposerKnown: '',
  proposerPhone: '',
  proposerName: '',
  seconderName: '',
};
