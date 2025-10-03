import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const EditClassroom: FC<Props> = ({ classroom }) => {
  return (
    <AppLayout title={`Edit ${classroom.name}`} description="Edit classroom">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptas tempora optio error? Eaque voluptates amet minima odit harum voluptas
      sunt praesentium, iure tempore ipsam possimus aliquam nisi recusandae? Quo.
    </AppLayout>
  );
};

export default EditClassroom;
