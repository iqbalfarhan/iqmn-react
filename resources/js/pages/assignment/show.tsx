import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Assignment } from '@/types/assignment';
import { FC } from 'react';

type Props = {
  assignment: Assignment;
};

const ShowAssignment: FC<Props> = ({ assignment }) => {
  return (
    <AppLayout title="Detail Assignment" description="Detail assignment">
      <Card>
        <CardHeader>
          <CardTitle>{ assignment.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowAssignment;
