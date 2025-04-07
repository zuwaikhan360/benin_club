import { Service } from '@/types/services';
import { FaMapMarkerAlt, FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';
import { address, emails, tel } from './contact';

export const addresses: Service[] = [
  {
    id: 1,
    title: 'Sports area',
    description: 'We offer a range of state-of the art facilities',
    icon: FaMapMarkerAlt,
    link: '#',
  },
  {
    id: 2,
    title: 'club',
    description: address,
    icon: FaHome,
    link: '#',
  },
  {
    id: 3,
    title: 'write us',
    description: emails,
    icon: FaEnvelope,
    link: '#',
  },
  {
    id: 4,
    title: 'call us',
    description: tel,
    icon: FaPhone,
    link: '#',
  },
];
