import { IconType } from 'react-icons';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  link?: string;
}
