import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, strLimit } from '@/lib/utils';
import { Group, Material, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Crown, LogIn } from 'lucide-react';
import { FC } from 'react';
import UserDetailPopover from '../user/components/user-detail-popover';
import GroupJoinForm from './components/group-join-form';

type Props = {
  group: Group;
  materials: Material[];
  alreadyJoined: boolean;
};

const DetailGroup: FC<Props> = ({ group, materials = [], alreadyJoined }) => {
  const { auth } = usePage<SharedData>().props;

  const description = Object.entries(group.counts ?? {})
    .map(([k, v]) => `${v} ${k}`)
    .join(', ');

  return (
    <AppLayout
      title="Detail group"
      breadcrumbs={[
        {
          title: group.code,
          href: route('group.show', group.id),
        },
      ]}
      actions={
        <>
          {group.isPremium && (
            <Button variant={'outline'}>
              <Crown className="fill-yellow-500 stroke-yellow-500" /> Premium Group
            </Button>
          )}
          {auth.user.id !== group.user.id ||
            (alreadyJoined && (
              <GroupJoinForm code={group.code}>
                <Button>
                  <LogIn />
                  Join group
                </Button>
              </GroupJoinForm>
            ))}
        </>
      }
    >
      <Card>
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          {group.isPremium && <CardFooter>{formatRupiah(group.price)}</CardFooter>}
        </div>
        <Separator />
        <CardFooter className="flex flex-col justify-between lg:flex-row">
          <UserDetailPopover user={group.user} />
          <Button variant={'ghost'} disabled size={'sm'} className="line-clamp-1">
            {description}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Material</CardTitle>
          <CardDescription>Material yang tersedia</CardDescription>
        </CardHeader>
        <Accordion type="single" collapsible className="w-full">
          {materials.map((m) => (
            <AccordionItem value={`item-${m.id}`} key={m.id}>
              <CardContent>
                <AccordionTrigger>{m.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-muted-foreground md:flex-row">
                  <img src={m.thumbnail} alt={m.name} className="aspect-video w-full rounded object-cover md:w-32" />
                  <p>{strLimit(m.description ?? '', 225)}</p>
                </AccordionContent>
              </CardContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </AppLayout>
  );
};

export default DetailGroup;
