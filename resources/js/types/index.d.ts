import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
  permissions: string[];
  roles: string[];
  tugas_count: number;
  unpaid: number;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  alias?: string;
  badge?: string;
}

export interface SharedData {
  name: string;
  inspire: string;
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  notifikasis: Notifikasi[];
  [key: string]: unknown;
}

export type Notifikasi = {
  id: number;
  title: string;
  content: string;
  user_id: User['id'];
  user: User;
  link: string;
  read: boolean;
  created_at: string;
};

export type Stat = {
  number: number;
  label: string;
  description: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  last_login: string;
  roles: string[];
  permissions: string[];
  members?: Group[];
  socmed?: Socmed;
  [key: string]: unknown; // This allows for additional properties...
}

export type Snippet = {
  id: number;
  name: string;
};

export type FormPurpose = 'create' | 'edit' | 'duplicate';

export type Group = {
  id: number;
  name: string;
  description: string;
  code: string;
  user: User;
  material: Material[];
  price: number;
  isPremium: boolean;
  created_at: string;
  counts?: {
    members: number;
    materials: number;
    tugases: number;
    videos: number;
  };
};

export type Material = {
  id: number;
  group: Group;
  name: string;
  description: string;
  slide_url: string;
  video_url: string;
  publish: boolean;
  thumbnail: string;
  created_at: string;
  quizzes?: Quiz[];
};

export type SvgComponentProps = {
  className?: string;
};

export type Review = {
  user: User;
  comment: string;
  rating: number;
};

export type Role = {
  id: number;
  name: string;
  permissions: string[];
};

export type Tugas = {
  id: number;
  group?: Group;
  name: string;
  description: string;
  limit_date: string;
  rate: string;
  available: boolean;
  nilais: Nilai[];
  created_at: string;
};

export type Media = {
  id: number;
  collection_name: string;
  name: string;
  uuid: string;
  file_name: string;
  mime_type: string;
  size: number;
  original_url: string;
  preview_url: string;
};

export type Nilai = {
  id: number;
  tugas_id: number;
  user_id: number;
  user: User;
  tugas: Tugas;
  jawaban: string;
  nilai: number;
  created_at: string;
  media?: Media[];
};

export type GradeResult = {
  grade: string;
  comment: string;
  passed: boolean;
  emoticon: string;
};

export type QuizAnswer = 'a' | 'b' | 'c';

export type Quiz = {
  id: number;
  material_id: Material['id'];
  question: string;
  attachment: string;
  a: string;
  b: string;
  c: string;
  answer: QuizAnswer;
};

export type Socmed = {
  id: number;
  github: string;
  linkedin: string;
  youtube: string;
  instagram: string;
};

export type Chat = {
  id: number;
  user_id: number;
  material_id: number;
  message: string;
  created_at: string;
  user: User;
  material: Material;
};

export type Pembayaran = {
  id: number;
  group_id: number;
  user_id: number;
  group?: Group;
  user?: User;
  paid: boolean;
  thumbnail: string;
  description: string;
  amount: number;
  created_at: string;
};
