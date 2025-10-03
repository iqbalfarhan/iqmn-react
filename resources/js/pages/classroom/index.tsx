import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useViewMode } from '@/hooks/use-view-mode';
import AppLayout from '@/layouts/app-layout';
import { capitalizeWords } from '@/lib/utils';
import { SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ClassroomBulkDeleteDialog from './components/classroom-bulk-delete-dialog';
import ClassroomBulkEditSheet from './components/classroom-bulk-edit-sheet';
import ClassroomDeleteDialog from './components/classroom-delete-dialog';
import ClassroomFilterSheet from './components/classroom-filter-sheet';
import ClassroomFormSheet from './components/classroom-form-sheet';
import ClassroomItemCard from './components/classroom-item-card';

type Props = {
  classrooms: Classroom[];
  query: { [key: string]: string };
};

const ClassroomList: FC<Props> = ({ classrooms, query }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Classrooms"
      description="Manage your classrooms"
      actions={
        <>
          {permissions?.canAdd && (
            <ClassroomFormSheet purpose="create">
              <Button>
                <Plus />
                Create new classroom
              </Button>
            </ClassroomFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search classrooms..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ClassroomFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ClassroomFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ClassroomBulkEditSheet classroomIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ClassroomBulkEditSheet>
            <ClassroomBulkDeleteDialog classroomIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ClassroomBulkDeleteDialog>
          </>
        )}
        <Button onClick={toggle}>
          <TableIcon />
          {capitalizeWords(mode)}
        </Button>
      </div>
      {mode === 'table' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Label>
                    <Checkbox
                      checked={ids.length === classrooms.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIds(classrooms.map((classroom) => classroom.id));
                        } else {
                          setIds([]);
                        }
                      }}
                    />
                  </Label>
                </Button>
              </TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Classroom name</TableHead>
              <TableHead>Pengajar</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classrooms
              .filter((classroom) => JSON.stringify(classroom).toLowerCase().includes(cari.toLowerCase()))
              .map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Label>
                        <Checkbox
                          checked={ids.includes(classroom.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIds([...ids, classroom.id]);
                            } else {
                              setIds(ids.filter((id) => id !== classroom.id));
                            }
                          }}
                        />
                      </Label>
                    </Button>
                  </TableCell>
                  <TableCell>{classroom.code}</TableCell>
                  <TableCell>{classroom.name}</TableCell>
                  <TableCell>{classroom.user.name}</TableCell>
                  <TableCell>
                    {permissions?.canShow && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('classroom.overview', classroom.id)}>
                          <Folder />
                        </Link>
                      </Button>
                    )}
                    {permissions?.canUpdate && (
                      <>
                        <ClassroomFormSheet purpose="edit" classroom={classroom}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </ClassroomFormSheet>
                      </>
                    )}
                    {permissions?.canDelete && (
                      <ClassroomDeleteDialog classroom={classroom}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Trash2 />
                        </Button>
                      </ClassroomDeleteDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid-responsive grid gap-4">
          {classrooms
            .filter((classroom) => JSON.stringify(classroom).toLowerCase().includes(cari.toLowerCase()))
            .map((classroom) => (
              <ClassroomItemCard key={classroom.id} classroom={classroom} />
            ))}
        </div>
      )}
    </AppLayout>
  );
};

export default ClassroomList;
