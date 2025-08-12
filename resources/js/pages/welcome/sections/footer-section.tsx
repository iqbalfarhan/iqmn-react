import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

const FooterSection = () => {
  const { inspire } = usePage<SharedData>().props;
  return <div className="px-4 py-12 text-center">{inspire}</div>;
};

export default FooterSection;
