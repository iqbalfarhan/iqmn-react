import HeadingSmall from '@/components/heading-small';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu';
import { em } from '@/lib/utils';
import { Group, User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import UserDetailPopover from '../../user/components/user-detail-popover';
import GroupAddMember from '../components/group-add-member';
import GroupLayout from '../layout/group-layout';

type Props = {
  members: User[];
};

const GroupMember: FC<Props> = ({ members }) => {
  const { canEditGroup, group } = usePage<{ canEditGroup: boolean; group: Group }>().props;

  const [showKickDialog, setShowKickDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const handleKickMember = (member: User) => {
    setSelectedMember(member);
    setShowKickDialog(true);
  };

  const handleConfirmKick = () => {
    if (selectedMember) {
      router.delete(route('group.kick-member', [group.id, selectedMember.id]), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil mengeluarkan pengguna');
        },
        onError: (e) => toast.error(em(e)),
      });
    }
    setShowKickDialog(false);
    setSelectedMember(null);
  };

  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Anggota',
          href: route('group.member', group.id),
        },
      ]}
    >
      <HeadingSmall
        title="Anggota group"
        description="List anggota group"
        actions={
          <>
            {canEditGroup && (
              <GroupAddMember>
                <Button>
                  <Plus />
                  Tambah member baru
                </Button>
              </GroupAddMember>
            )}
          </>
        }
      />
      <div className="flex flex-row flex-wrap gap-2">
        {members.map((member) => (
          <ContextMenu key={member.id}>
            <ContextMenuTrigger>
              <UserDetailPopover user={member}>
                <div className="max-w-24 items-center justify-center space-y-2 p-4">
                  <Avatar className="mx-auto size-16">
                    <AvatarImage src={member.avatar} alt={member.name} title={member.name} />
                  </Avatar>
                  <span className="line-clamp-2 text-center text-xs text-wrap">{member.name}</span>
                </div>
              </UserDetailPopover>
            </ContextMenuTrigger>
            {canEditGroup && (
              <ContextMenuContent>
                <ContextMenuItem asChild>
                  <Link href={route('user.show', member.id)}>Profil anggota</Link>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  onSelect={(event) => {
                    event.preventDefault(); // Prevent context menu from closing
                    handleKickMember(member);
                  }}
                >
                  Keluarkan dari group
                </ContextMenuItem>
              </ContextMenuContent>
            )}
          </ContextMenu>
        ))}

        <AlertDialog open={showKickDialog} onOpenChange={setShowKickDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Keluarkan dari Group</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengeluarkan {selectedMember?.name} dari group ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmKick}>Keluarkan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </GroupLayout>
  );
};

export default GroupMember;
