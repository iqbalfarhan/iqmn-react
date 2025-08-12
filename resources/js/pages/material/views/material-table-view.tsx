import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dateDFYHIS, strLimit } from '@/lib/utils';
import { Material } from '@/types';
import { Link } from '@inertiajs/react';
import { Check, Edit, ExternalLink, Folder, Trash2 } from 'lucide-react';
import { FC } from 'react';
import MaterialDeleteDialog from '../components/material-delete-dialog';
import MaterialFormSheet from '../components/material-form-sheet';

type Props = {
  materials: Material[];
  canEditGroup?: boolean;
};

const MaterialTableView: FC<Props> = ({ materials, canEditGroup = false }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Judul material</TableHead>
          <TableHead>Group name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Publish</TableHead>
          <TableHead>Quiz</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map((material) => (
          <TableRow key={material.id}>
            <TableCell>{strLimit(material.name, 30)}</TableCell>
            <TableCell>{material.group.name}</TableCell>
            <TableCell>{dateDFYHIS(material.created_at)}</TableCell>
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
              {canEditGroup && (
                <>
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
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaterialTableView;
