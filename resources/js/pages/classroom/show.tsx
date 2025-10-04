import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';
import ClassroomFeedFormCard from './components/classroom-feed-form-card';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <AppLayout title={classroom.name} description={`#${classroom.code}`}>
      {classroom.cover ? (
        <div className="group relative overflow-hidden rounded-lg">
          <img src={classroom.cover} alt="" className="h-56 w-full rounded-lg object-cover opacity-90" />
          <h3 className="absolute top-0 flex h-full w-full flex-1 items-center justify-center rounded-lg bg-background/50 text-4xl font-bold text-foreground opacity-0 backdrop-blur-xs transition-all group-hover:opacity-100">
            #{classroom.code}
          </h3>
        </div>
      ) : (
        <Skeleton className="h-56 w-full" />
      )}
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-6">
          <Card className="sticky top-0 z-100 h-fit space-y-6 border-0 bg-transparent shadow-none">
            <CardFooter className="flex items-center gap-4">
              <Avatar className="size-10">
                <AvatarImage src={classroom.user.avatar} />
              </Avatar>
              <div>
                <p>{classroom.user.name}</p>
                <p className="text-xs text-muted-foreground">{classroom.user.email}</p>
              </div>
            </CardFooter>

            <CardHeader>
              <CardDescription>Description</CardDescription>
              <CardTitle className="leading-normal font-normal">{classroom.description}</CardTitle>
            </CardHeader>

            <CardHeader>
              <CardDescription>Classroom members</CardDescription>
              <CardTitle className="flex flex-wrap gap-2">
                {classroom.members.map((user) => (
                  <Avatar className="size-10" key={user.id}>
                    <AvatarImage src={user.avatar} />
                  </Avatar>
                ))}
              </CardTitle>
            </CardHeader>
          </Card>
          <div className="col-span-2 space-y-6">
            <ClassroomFeedFormCard />
            {Array.from({ length: 13 }).map((_, index) => (
              <Card key={index} className="h-52 w-full" />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowClassroom;
