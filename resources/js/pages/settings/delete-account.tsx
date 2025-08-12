import { type BreadcrumbItem } from '@/types';

import DeleteUser from '@/components/delete-user';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan user',
    href: route('profile.edit'),
  },
  {
    title: 'Delete Account',
    href: '/settings/appearance',
  },
];

export default function DeleteAccount() {
  return (
    <SettingsLayout breadcrumbs={breadcrumbs} title="Delete account" description="Update your account's appearance settings">
      <DeleteUser />
    </SettingsLayout>
  );
}
