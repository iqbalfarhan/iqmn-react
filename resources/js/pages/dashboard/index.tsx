import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import ClassroomJoinDialog from '../classroom/components/classroom-join-dialog';
import DateTimeWidget from './widget/date-time-widget';
import UserInfoWidget from './widget/user-info-widget';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;

  return (
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <UserInfoWidget />
        <DateTimeWidget />
      </div>
      <div className="grid-responsive grid gap-4">
        <ClassroomJoinDialog />
      </div>
    </AppLayout>
  );
}
