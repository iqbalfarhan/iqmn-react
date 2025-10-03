import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Classroom } from '@/types/classroom';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
  className?: string;
};

const ClassroomItemCard: FC<Props> = ({ classroom, className }) => {
  return (
    <Card className={className}>
      <CardHeader onClick={() => router.visit(route('classroom.overview', classroom.id))}>
        <CardDescription>#{classroom.code}</CardDescription>
        <CardTitle className="leading-normal">{classroom.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ClassroomItemCard;
