import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { BreadcrumbItem, Group, NavItem, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Book, Crown, Edit, EllipsisVertical, Eye, Folder, LinkIcon, LogOut, Play, Settings, User } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import GroupShowCode from '../components/group-show-code';

type Props = PropsWithChildren & {
  breadcrumbs?: BreadcrumbItem[];
};

const GroupLayout: FC<Props> = ({ children, breadcrumbs }) => {
  const [openCodeDialog, setOpenCodeDialog] = useState(false);

  const {
    url,
    props: { auth, group, canEditGroup },
  } = usePage<SharedData & { group: Group; canEditGroup: boolean }>();

  const mainBreadcrumbs: BreadcrumbItem[] = [
    {
      title: group.code,
      href: route('group.show', group.id),
    },
    ...(breadcrumbs ?? []),
  ];

  const groupNav: NavItem[] = [
    {
      title: 'Materi belajar',
      href: route('group.material', group.id),
      icon: Book,
      isActive: url === `/group/${group.id}/material`,
    },
    {
      title: 'Materi video',
      href: route('group.video', group.id),
      icon: Play,
      isActive: url === `/group/${group.id}/video`,
    },
    {
      title: 'Tugas kelas',
      href: route('group.tugas', group.id),
      icon: Edit,
      isActive: url === `/group/${group.id}/tugas`,
    },
    {
      title: 'Nilai tugas',
      href: route('group.nilai', group.id),
      icon: LinkIcon,
      isActive: url === `/group/${group.id}/nilai`,
    },
    {
      title: 'Anggota kelas',
      href: route('group.member', group.id),
      icon: User,
      isActive: url === `/group/${group.id}/member`,
    },
  ];

  const description = Object.entries(group.counts ?? {})
    .map(([k, v]) => `${v} ${k}`)
    .join(', ');

  return (
    <AppLayout
      title={group.name}
      description={description}
      breadcrumbs={mainBreadcrumbs}
      actions={
        <>
          {group.isPremium && (
            <Button variant={'outline'}>
              <Crown className="fill-yellow-500 stroke-yellow-500" /> Premium Group
            </Button>
          )}
          {/* {canEditGroup && (
            <GroupFormSheet purpose="edit" group={group}>
              <Button>
                <Edit />
                Edit group
              </Button>
            </GroupFormSheet>
          )} */}
        </>
      }
    >
      <GroupShowCode code={group.code} open={openCodeDialog} onOpenChange={setOpenCodeDialog} />
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="flex justify-between">
              <CardHeader>
                <CardTitle>
                  [{group.code}] {group.name}
                </CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardHeader>
                <div className="flex justify-end space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={'outline'} size={'icon'}>
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Folder />
                        Detail group
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOpenCodeDialog(true)}>
                        <Eye />
                        Tampilkan kode
                      </DropdownMenuItem>
                      {auth.user.id !== group.user.id && group.isPremium === false && (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            router.delete(route('group.leave', group.id), {
                              preserveScroll: true,
                              onSuccess: () => toast.success('Berhasil keluar dari group'),
                              onError: (e) => toast.error(em(e)),
                            });
                          }}
                        >
                          <LogOut />
                          Keluar dari group
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
            </div>
            <Separator />
            <CardFooter className="flex flex-wrap gap-2">
              {[
                ...groupNav,
                ...(canEditGroup
                  ? [
                      {
                        title: 'Pengaturan',
                        href: route('group.edit', group.id),
                        icon: Settings,
                        isActive: url === `/group/${group.id}/edit`,
                      },
                    ]
                  : []),
              ].map((item, index) => (
                <Button key={index} variant={item.isActive ? 'default' : 'ghost'} asChild>
                  <Link href={item.href} preserveScroll={true}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </AppLayout>
  );
};

export default GroupLayout;
