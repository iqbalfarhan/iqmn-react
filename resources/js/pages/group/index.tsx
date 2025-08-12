import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, formatRupiah, strLimit } from '@/lib/utils';
import { Group } from '@/types';
import { Link } from '@inertiajs/react';
import { Crown, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import UserDetailPopover from '../user/components/user-detail-popover';
import GroupDeleteDialog from './components/group-delete-dialog';
import GroupFilterSheet from './components/group-filter-sheet';
import GroupFormSheet from './components/group-form-sheet';

type Props = {
  groups: Group[];
};

const GroupList: FC<Props> = ({ groups }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title="Groups"
      description="Manage your groups"
      breadcrumbs={[
        {
          title: 'Pengaturan group',
          href: route('group.index'),
        },
      ]}
      actions={
        <GroupFormSheet purpose="create">
          <Button>
            <Plus />
            Create new group
          </Button>
        </GroupFormSheet>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search groups..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <GroupFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </GroupFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <Button>
              <Edit /> Edit selected
            </Button>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === groups.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(groups.map((group) => group.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="w-fit text-center">M</TableHead>
            <TableHead className="w-fit text-center">T</TableHead>
            <TableHead className="w-fit text-center">A</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups
            .filter((group) => JSON.stringify(group).toLowerCase().includes(cari.toLowerCase()))
            .map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(group.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, group.id]);
                          } else {
                            setIds(ids.filter((id) => id !== group.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell className="font-mono font-medium">{group.code}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {strLimit(group.name, 30)} {group.isPremium && <Crown className="size-4 fill-yellow-500 stroke-yellow-500" />}
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(group.price)}</TableCell>
                <TableCell>
                  <UserDetailPopover user={group.user} />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('group.show', group.id)}>{group.counts?.materials}</Link>
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('group.tugas', group.id)}>{group.counts?.tugases}</Link>
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('group.member', group.id)}>{group.counts?.members}</Link>
                  </Button>
                </TableCell>
                <TableCell>{dateDFY(group.created_at)}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('group.show', group.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <GroupFormSheet purpose="edit" group={group}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </GroupFormSheet>
                  <GroupDeleteDialog group={group}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </GroupDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default GroupList;
