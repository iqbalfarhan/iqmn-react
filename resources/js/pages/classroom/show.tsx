import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
};

const ShowClassroom: FC<Props> = ({ classroom }) => {
  return (
    <AppLayout title={classroom.name} description={`#${classroom.code}`}>
      <Card className="h-48 w-full" />
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
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="size-10 rounded-full" />
                ))}
              </CardTitle>
            </CardHeader>
          </Card>
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create new feed</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea className="max-h-32" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <CardDescription>0/255 characters</CardDescription>
                </div>
                <Button>Post</Button>
              </CardFooter>
            </Card>
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
