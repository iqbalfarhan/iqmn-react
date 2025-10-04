import { User } from './user';

export type EnumVisibility = 'public' | 'private';

export type Classroom = {
  id: number;
  name: string;
  code: string;
  user_id: User['id'];
  user: User;
  description: string;
  url: string | null;
  visibility: EnumVisibility;
  materials: Material[];
  created_at: string;
  updated_at: string;
};
