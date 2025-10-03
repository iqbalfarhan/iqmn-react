import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import ClassroomFormSheet from './components/classroom-form-sheet';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  const { permissions } = usePage<SharedData>().props;
  return (
    <AppLayout
      title={classroom.name}
      description={`#${classroom.code}`}
      actions={
        <>
          {permissions?.canUpdate && (
            <ClassroomFormSheet purpose="edit" classroom={classroom}>
              <Button>
                <Edit />
                Edit classroom
              </Button>
            </ClassroomFormSheet>
          )}
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{classroom.name}</CardTitle>
          <CardDescription>{classroom.description}</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowClassroom;
