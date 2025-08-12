import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { Material } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, Edit, ExternalLink, Filter, Folder, Trash2, X } from 'lucide-react';
import { FC, useState } from 'react';
import MaterialDeleteDialog from './components/material-delete-dialog';
import MaterialFilterSheet from './components/material-filter-sheet';
import MaterialFormSheet from './components/material-form-sheet';

type Props = {
  materials: Material[];
};

const MaterialList: FC<Props> = ({ materials }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout title="Materials" description="Manage your materials">
      <div className="flex gap-2">
        <Input placeholder="Search materials..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {cari.length > 0 && (
          <Button variant={'destructive'} onClick={() => setCari('')}>
            <X />
            Clear search
          </Button>
        )}
        <MaterialFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </MaterialFilterSheet>
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
                    checked={ids.length === materials.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(materials.map((material) => material.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Judul material</TableHead>
            <TableHead>Group name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Publish</TableHead>
            <TableHead>Quiz</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials
            .filter((material) => JSON.stringify(material).toLowerCase().includes(cari.toLowerCase()))
            .map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(material.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, material.id]);
                          } else {
                            setIds(ids.filter((id) => id !== material.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{strLimit(material.name, 30)}</TableCell>
                <TableCell onClick={() => setCari(material.group.name)}>{material.group.name}</TableCell>
                <TableCell>{dayjs(material.created_at).format('DD MMMM YYYY HH:mm')}</TableCell>
                <TableCell>
                  {material.publish == true && (
                    <Badge>
                      <Check /> Published
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{material.quizzes?.length}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <a href={material.slide_url} target="_blank">
                      <ExternalLink />
                    </a>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('material.show', material.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <MaterialFormSheet purpose="edit" material={material} groupId={material.group.id}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </MaterialFormSheet>
                  <MaterialDeleteDialog material={material}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </MaterialDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default MaterialList;
