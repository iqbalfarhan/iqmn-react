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
import { Material } from '@/types/material';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Image, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import MaterialBulkDeleteDialog from './components/material-bulk-delete-dialog';
import MaterialBulkEditSheet from './components/material-bulk-edit-sheet';
import MaterialDeleteDialog from './components/material-delete-dialog';
import MaterialFilterSheet from './components/material-filter-sheet';
import MaterialFormSheet from './components/material-form-sheet';
import MaterialItemCard from './components/material-item-card';
import MaterialUploadMediaSheet from './components/material-upload-sheet';

type Props = {
  materials: Material[];
  query: { [key: string]: string };
};

const MaterialList: FC<Props> = ({ materials, query }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Materials"
      description="Manage your materials"
      actions={
        <>
          {permissions?.canAdd && (
            <MaterialFormSheet purpose="create">
              <Button>
                <Plus />
                Create new material
              </Button>
            </MaterialFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search materials..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <MaterialFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </MaterialFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <MaterialBulkEditSheet materialIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </MaterialBulkEditSheet>
            <MaterialBulkDeleteDialog materialIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </MaterialBulkDeleteDialog>
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
              <TableHead>Name</TableHead>
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
                  <TableCell>{material.name}</TableCell>
                  <TableCell>
                    {permissions?.canShow && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('material.show', material.id)}>
                          <Folder />
                        </Link>
                      </Button>
                    )}
                    {permissions?.canUpdate && (
                      <>
                        <MaterialUploadMediaSheet material={material}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Image />
                          </Button>
                        </MaterialUploadMediaSheet>
                        <MaterialFormSheet purpose="edit" material={material}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </MaterialFormSheet>
                      </>
                    )}
                    {permissions?.canDelete && (
                      <MaterialDeleteDialog material={material}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Trash2 />
                        </Button>
                      </MaterialDeleteDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid-responsive grid gap-4">
          {materials
            .filter((material) => JSON.stringify(material).toLowerCase().includes(cari.toLowerCase()))
            .map((material) => (
              <MaterialItemCard key={material.id} material={material} />
            ))}
        </div>
      )}
    </AppLayout>
  );
};

export default MaterialList;
