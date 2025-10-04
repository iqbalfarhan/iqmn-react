import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
      <CardHeader onClick={() => router.visit(route('classroom.overview', classroom.id))} className="h-full">
        <CardDescription>#{classroom.code}</CardDescription>
        <CardTitle className="leading-normal">{classroom.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-2">
        <Badge variant={'secondary'}>{classroom.materials.length} materials</Badge>
        <Avatar className="size-6">
          <AvatarFallback>?</AvatarFallback>
          <AvatarImage src={classroom.user.avatar} />
        </Avatar>
      </CardFooter>
    </Card>
  );
};

export default ClassroomItemCard;
