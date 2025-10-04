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
import { Assignment } from '@/types/assignment';
import { Link, usePage} from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import AssignmentDeleteDialog from './components/assignment-delete-dialog';
import AssignmentFilterSheet from './components/assignment-filter-sheet';
import AssignmentFormSheet from './components/assignment-form-sheet';
import AssignmentBulkEditSheet from './components/assignment-bulk-edit-sheet';
import AssignmentBulkDeleteDialog from './components/assignment-bulk-delete-dialog';
import AssignmentUploadMediaSheet from './components/assignment-upload-sheet';
import AssignmentItemCard from './components/assignment-item-card';

type Props = {
  assignments: Assignment[];
  query: { [key: string]: string };
};

const AssignmentList: FC<Props> = ({ assignments, query }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Assignments"
      description="Manage your assignments"
      actions={
        <>
          {permissions?.canAdd && (
            <AssignmentFormSheet purpose="create">
              <Button>
                <Plus />
                Create new assignment
              </Button>
            </AssignmentFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search assignments..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <AssignmentFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </AssignmentFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <AssignmentBulkEditSheet assignmentIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </AssignmentBulkEditSheet>
            <AssignmentBulkDeleteDialog assignmentIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </AssignmentBulkDeleteDialog>
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
                      checked={ids.length === assignments.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIds(assignments.map((assignment) => assignment.id));
                        } else {
                          setIds([]);
                        }
                      }}
                    />
                  </Label>
                </Button>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments
              .filter((assignment) => JSON.stringify(assignment).toLowerCase().includes(cari.toLowerCase()))
              .map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Label>
                        <Checkbox
                          checked={ids.includes(assignment.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIds([...ids, assignment.id]);
                            } else {
                              setIds(ids.filter((id) => id !== assignment.id));
                            }
                          }}
                        />
                      </Label>
                    </Button>
                  </TableCell>
                  <TableCell>{ assignment.name }</TableCell>
                  <TableCell>
                    {permissions?.canShow && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('assignment.show', assignment.id)}>
                          <Folder />
                        </Link>
                      </Button>
                    )}
                    {permissions?.canUpdate && (
                      <>
                        <AssignmentUploadMediaSheet assignment={assignment}>
    <Button variant={'ghost'} size={'icon'}>
        <Image />
    </Button>
</AssignmentUploadMediaSheet>
                        <AssignmentFormSheet purpose="edit" assignment={assignment}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </AssignmentFormSheet>
                      </>
                    )}
                    {permissions?.canDelete && (
                      <AssignmentDeleteDialog assignment={assignment}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Trash2 />
                        </Button>
                      </AssignmentDeleteDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        ) : (
        <div className="grid-responsive grid gap-4">
          {assignments
            .filter((assignment) => JSON.stringify(assignment).toLowerCase().includes(cari.toLowerCase()))
            .map((assignment) => (
            <AssignmentItemCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default AssignmentList;
