import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, strLimit } from '@/lib/utils';
import { Group, Tugas } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, Edit, Folder, Plus, Trash2, X } from 'lucide-react';
import { FC } from 'react';
import TugasDeleteDialog from '../../tugas/components/tugas-alert-dialog';
import TugasChangeBobotPopover from '../../tugas/components/tugas-change-bobot-popover';
import TugasFormSheet from '../../tugas/components/tugas-form-sheet';
import GroupLayout from '../layout/group-layout';

type Props = {
  tugases: Tugas[];
};

const TugasGroup: FC<Props> = ({ tugases }) => {
  const { group, canEditGroup } = usePage<{ group: Group; canEditGroup: boolean }>().props;

  const total = tugases.reduce((total, tugas) => total + parseInt(tugas.rate ?? 0), 0);

  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Tugas',
          href: route('group.tugas', group.id),
        },
      ]}
    >
      <HeadingSmall
        title="Tugas kelas"
        description="List anggota group"
        actions={
          <>
            {canEditGroup && (
              <TugasFormSheet purpose="create" groupId={group.id}>
                <Button>
                  <Plus />
                  Buat tugas baru
                </Button>
              </TugasFormSheet>
            )}
          </>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Judul tugas</TableHead>
            <TableHead>Batas Kumpul</TableHead>
            <TableHead className="text-center">Bobot</TableHead>
            <TableHead>Status sesi</TableHead>
            <TableHead>Done</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tugases.map((tugas) => (
            <TableRow key={tugas.id}>
              <TableCell>{tugas.id}</TableCell>
              <TableCell>{strLimit(tugas.name, 40)}</TableCell>
              <TableCell>{tugas.limit_date && dayjs(tugas.limit_date).format('DD MMMM YYYY')}</TableCell>
              <TableCell className="text-center">
                <TugasChangeBobotPopover tugas={tugas} canEdit={canEditGroup}>
                  <div>{tugas.rate}%</div>
                </TugasChangeBobotPopover>
              </TableCell>
              <TableCell>
                {tugas.available ? (
                  <Badge>
                    <Check />
                    dibuka
                  </Badge>
                ) : (
                  <Badge variant={'secondary'} className="opacity-50" title="Peserta tidak bisa mengubah dan mengupload jawaban">
                    <X />
                    ditutup
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {tugas.nilais.length}/{group?.counts?.members ?? 0}
              </TableCell>
              <TableCell>
                <Button variant={'ghost'} size={'icon'}>
                  <Link href={route('tugas.show', tugas.id)}>
                    <Folder />
                  </Link>
                </Button>
                {canEditGroup && (
                  <>
                    <TugasFormSheet purpose="edit" groupId={group.id} tugas={tugas}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </TugasFormSheet>
                    <TugasDeleteDialog tugas={tugas}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </TugasDeleteDialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3} className="text-right">
              Total bobot nilai
            </TableHead>
            <TableHead className={cn('text-center', total == 100 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500')}>
              {total}%
            </TableHead>
            <TableHead colSpan={3} />
          </TableRow>
        </TableHeader>
      </Table>
    </GroupLayout>
  );
};

export default TugasGroup;
