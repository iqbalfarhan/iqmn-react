import AppearanceTabs from '@/components/appearance-tabs';
import { type BreadcrumbItem } from '@/types';

import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan user',
    href: route('profile.edit'),
  },
  {
    title: 'Appearance settings',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <SettingsLayout breadcrumbs={breadcrumbs} title="Appearance settings" description="Update your account's appearance settings">
      <div className="space-y-6">
        <AppearanceTabs />
      </div>
    </SettingsLayout>
  );
}
