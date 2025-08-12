import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Folder, LogIn, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import UserDeleteDialog from './components/user-delete-dialog';
import UserDetailPopover from './components/user-detail-popover';
import UserFilterSheet from './components/user-filter-sheet';
import UserFormSheet from './components/user-form-sheet';

type Props = {
  users: User[];
};

const UserList: FC<Props> = ({ users }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title="Users"
      description="Manage your users"
      breadcrumbs={[
        {
          title: 'Pengaturan user',
          href: route('user.index'),
        },
      ]}
      actions={
        <UserFormSheet purpose="create">
          <Button>
            <Plus />
            Create new user
          </Button>
        </UserFormSheet>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search users..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <UserFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </UserFilterSheet>
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
                    checked={ids.length === users.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(users.map((user) => user.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter((user) => JSON.stringify(user).toLowerCase().includes(cari.toLowerCase()))
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, user.id]);
                          } else {
                            setIds(ids.filter((id) => id !== user.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <UserDetailPopover user={user}>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={user.avatar} />
                      </Avatar>
                      {user.name}
                    </div>
                  </UserDetailPopover>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(', ')}</TableCell>
                <TableCell>{dateDFYHIS(user.last_login)}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('user.login-as', user.id)}>
                      <LogIn />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('user.show', user.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <UserFormSheet purpose="edit" user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </UserFormSheet>
                  <UserDeleteDialog user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </UserDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default UserList;
