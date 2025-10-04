import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';
import ClassroomItemCard from './components/classroom-item-card';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <AppLayout title={classroom.name} description={`#${classroom.code}`}>
      <div className="grid-responsive grid gap-4">
        <ClassroomItemCard classroom={classroom} />
      </div>
    </AppLayout>
  );
};

export default ShowClassroom;
