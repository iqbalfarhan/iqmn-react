import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Tugas } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Folder, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TugasDeleteDialog from './components/tugas-alert-dialog';
import TugasFilterSheet from './components/tugas-filter-sheet';
import TugasFormSheet from './components/tugas-form-sheet';

type Props = {
  tugases: Tugas[];
};

const TugasList: FC<Props> = ({ tugases }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout title="Tugass" description="Manage your tugases">
      <div className="flex gap-2">
        <Input placeholder="Search tugases..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <TugasFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </TugasFilterSheet>
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
                    checked={ids.length === tugases.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(tugases.map((tugas) => tugas.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Group name</TableHead>
            <TableHead>Judul tugas</TableHead>
            <TableHead>Bobot</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tugases
            .filter((tugas) => JSON.stringify(tugas).toLowerCase().includes(cari.toLowerCase()))
            .map((tugas) => (
              <TableRow key={tugas.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(tugas.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, tugas.id]);
                          } else {
                            setIds(ids.filter((id) => id !== tugas.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{tugas.group?.name}</TableCell>
                <TableCell>{tugas.name}</TableCell>
                <TableCell>{tugas.rate}%</TableCell>
                <TableCell>{tugas.nilais?.length}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('tugas.show', tugas.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <TugasFormSheet groupId={tugas.group?.id} purpose="edit" tugas={tugas}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </TugasFormSheet>
                  <TugasDeleteDialog tugas={tugas}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </TugasDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default TugasList;
