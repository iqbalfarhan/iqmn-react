import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export type PageProps<T = unknown> = {
  [key: string]: T;
};

export const usePageProps = <T extends PageProps = SharedData>() => {
  const { props } = usePage<T>();
  return props;
};
