import { Media } from '.';
import { Classroom } from './classroom';

export type Material = {
  id: number;
  name: string;
  media: Media[];
  description: string;
  url: string;
  classroom_id: Classroom['id'];
  classroom: Classroom;
  visible: boolean;
  created_at: string;
  updated_at: string;
};
