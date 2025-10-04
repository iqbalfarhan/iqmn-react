import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Classroom } from '@/types/classroom';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import ClassroomFormSheet from '../classroom/components/classroom-form-sheet';
import ClassroomItemCard from '../classroom/components/classroom-item-card';
import ClassroomJoinDialog from '../classroom/components/classroom-join-dialog';
import DateTimeWidget from './widget/date-time-widget';
import UserInfoWidget from './widget/user-info-widget';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  classrooms: Classroom[];
  memberof: Classroom[];
};

const Dashboard: FC<Props> = ({ classrooms = [], memberof = [] }) => {
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
        {memberof.map((classroom) => (
          <ClassroomItemCard key={classroom.id} classroom={classroom} isMember />
        ))}

        {classrooms.map((classroom) => (
          <ClassroomItemCard key={classroom.id} classroom={classroom} />
        ))}

        <Card className="aspect-video size-full cursor-pointer border-4 border-dashed opacity-50 hover:opacity-100">
          <CardContent className="flex flex-1 flex-col items-center justify-center space-y-1.5">
            <ClassroomJoinDialog />
            <ClassroomFormSheet purpose="create">
              <Button>
                <Plus />
                Create classroom
              </Button>
            </ClassroomFormSheet>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
