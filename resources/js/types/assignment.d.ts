import { Classroom } from "./classroom";
import { Media } from '.';



export type Assignment = {
  id: number;
  media: Media[];
  name: string;
  media: Media[];
  classroom_id: Classroom['id'];
  classroom: Classroom;
  media: Media[];
  description: string;
  media: Media[];
  visible: boolean;
  created_at: string;
  updated_at: string;
};
