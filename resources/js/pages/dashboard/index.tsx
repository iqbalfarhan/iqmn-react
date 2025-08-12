import HeadingSmall from '@/components/heading-small';
import InputIcon from '@/components/input-icon';
import NoContent from '@/components/no-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Group, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC, useState } from 'react';
import GroupFormSheet from '../group/components/group-form-sheet';
import GroupItemCard from '../group/components/group-item-card';

type Props = {
  groups: Group[];
  members: Group[];
  canCreateGroup: boolean;
};

const Dashboard: FC<Props> = ({ groups, members, canCreateGroup = false }) => {
  const {
    auth: { user, roles },
  } = usePage<SharedData>().props;

  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title={user.name}
      description={`Welcome to your dashboard!, you're login as ${roles.join(', ')}`}
      actions={
        <>
          {canCreateGroup && (
            <GroupFormSheet purpose="create">
              <Button>
                <Plus />
                Buat group baru
              </Button>
            </GroupFormSheet>
          )}
        </>
      }
    >
      <InputIcon placeholder="Pencarian..." value={cari} onChange={(e) => setCari(e.target.value)} />

      {groups.length > 0 && (
        <>
          <HeadingSmall title="Group yang gw buat" description="Groups that you are owner" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups
              .filter((g) => JSON.stringify(g).toLowerCase().includes(cari.toLowerCase()))
              .map((group) => (
                <GroupItemCard group={group} key={group.id} />
              ))}
          </div>
        </>
      )}

      {members.length > 0 && (
        <>
          <HeadingSmall title="Group yang gw follow" description="Groups that you are following" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members
              .filter((g) => JSON.stringify(g).toLowerCase().includes(cari.toLowerCase()))
              .map((group) => (
                <GroupItemCard group={group} key={group.id} />
              ))}
          </div>
        </>
      )}

      {groups.length + members.length === 0 && <NoContent />}
    </AppLayout>
  );
};

export default Dashboard;
