import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dateDFY } from '@/lib/utils';
import { BreadcrumbItem, Group, User } from '@/types';
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { FC } from 'react';
import GroupItemCard from '../group/components/group-item-card';

type Props = {
  user: User;
  groups: Group[];
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User',
    href: route('user.index'),
  },
];

const DetailUser: FC<Props> = ({ user, groups }) => {
  const socmed = user.socmed;
  return (
    <AppLayout
      title={'Detail user'}
      description="Menampilkan detail user, group yang diikuti dan materi yang diupload"
      breadcrumbs={[
        ...breadcrumbs,
        {
          title: user.name,
          href: route('user.show', user.id),
        },
      ]}
    >
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={user.avatar} alt={user.name} />
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>
              {user.email} as {user.roles?.join(', ')} join since {dateDFY(user.created_at)}.
            </CardDescription>
          </div>
        </CardHeader>
        {socmed && (
          <>
            <CardFooter className="flex w-fit items-center justify-center text-xs">
              {socmed?.github && (
                <Button variant={'ghost'} size={'icon'} asChild>
                  <a href={socmed.github} target="_blank">
                    <Github />
                  </a>
                </Button>
              )}
              {socmed?.linkedin && (
                <Button variant={'ghost'} size={'icon'} asChild>
                  <a href={socmed.linkedin} target="_blank">
                    <Linkedin />
                  </a>
                </Button>
              )}
              {socmed?.youtube && (
                <Button variant={'ghost'} size={'icon'} asChild>
                  <a href={socmed.youtube} target="_blank">
                    <Youtube />
                  </a>
                </Button>
              )}
              {socmed?.instagram && (
                <Button variant={'ghost'} size={'icon'} asChild>
                  <a href={socmed.instagram} target="_blank">
                    <Instagram />
                  </a>
                </Button>
              )}
            </CardFooter>
          </>
        )}
      </Card>
      <HeadingSmall title="Group yang diikuti" description="Groups yang diikuti user ini" />
      <div className="grid grid-cols-4 gap-4">
        {groups.map((group) => (
          <GroupItemCard group={group} />
        ))}
      </div>
    </AppLayout>
  );
};

export default DetailUser;
