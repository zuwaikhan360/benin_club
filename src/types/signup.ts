import { IUser } from '@/models/user.model';

export interface SectionProps {
  formData: IUser;
  error: ErrorData;
  loading: boolean;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  handleError: (name: string, value: string) => void;
  setFormData: SetFormData;
  isAdmin?: boolean;
}

export type SetFormData = (
  updateFormData: (prevFormData: IUser) => IUser
) => void;

type Contact = {
  address: string;
  tel: string;
};

export interface FormData {
  [key: string]:
    | string
    | string[]
    | number
    | Child[]
    | Education[]
    | WorkExperience[]
    | Contact;
  memberId: string;
  email: string;
  surName: string;
  wife: string;
  wifeId: string;
  firstName: string;
  dob: string;
  nationality: string;
  address: string;
  tel: string;
  permanent: Contact;
  occupation: Contact;
  employer: string;
  business: Contact;
  nameOfBankers: string;
  employed: string;
  married: string;
  isNigeria: string;
  clubMemberRelative: string;
  dependentRelativeBenin: string;
  residePermanentlyBenin: string;
  otherClubMember: string;
  playSport: string;
  knownAilment: string;
  transferOutOfBenin: string;
  chargedWithCriminalOffense: string;
  marriageDuration: number;
  numberOfChildren: number;
  children: Child[];
  addressYears: string;
  emergencyContact: string;
  disability: string;
  sportSection: string[];
  reasonToJoin: string;
  tribe: string;
  image: string;
  numberOfWives: string;
  educations: Education[];
  category: string;
  workExperiences: WorkExperience[];
  proposerPersonality: string;
  proposerKnown: string;
  proposerPhone: string;
  proposerName: string;
  step: number;
  // add more fields as needed
}

export interface ErrorData {
  memberId: string;
  general: string;
  email: string;
  surName: string;
  wife: string;
  wifeId: string;
  category: string;
  firstName: string;
  dob: string;
  nationality: string;
  address: string;
  tel: string;
  permanentAddress: string;
  permanentAddressTel: string;
  occupation: string;
  occupationTel: string;
  employer: string;
  businessAddress: string;
  businessAddressTel: string;
  nameOfBankers: string;
  employed: string;
  married: string;
  image: string;
  isNigeria: string;
  clubMemberRelative: string;
  dependentRelativeBenin: string;
  residePermanentlyBenin: string;
  otherClubMember: string;
  playSport: string;
  knownAilment: string;
  transferOutOfBenin: string;
  chargedWithCriminalOffense: string;
  marriageDuration: string;
  numberOfChildren: string;
  children: string;
  addressYears: string;
  emergencyContact: string;
  disability: string;
  sportSection: string;
  reasonToJoin: string;
  tribe: string;
  numberOfWives: string;
  educations: string;
  workExperiences: string;
  proposerPersonality: string;
  proposerKnown: string;
  proposerPhone: string;
  proposerName: string;
  seconderName: string;
  // add more fields as needed
}

export interface Child {
  name: string;
  age: number;
  school: string;
  sex: 'male' | 'female';
  image: string;
}
export interface Education {
  school: string;
  from: string;
  to: string;
  degree: string;
}

export interface WorkExperience {
  from: string;
  to: string;
  employee: string;
  position: string;
  jobDescription: string;
  isCurrentJob: boolean;
}
