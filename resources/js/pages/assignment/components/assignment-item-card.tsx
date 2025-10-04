import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FC } from 'react';
import { Assignment } from '@/types/assignment';

type Props = {
  assignment: Assignment;
  className?: string;
};

const AssignmentItemCard: FC<Props> = ({ assignment, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ assignment.name }</CardTitle>
        <CardDescription>
            ID: { assignment.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AssignmentItemCard;
