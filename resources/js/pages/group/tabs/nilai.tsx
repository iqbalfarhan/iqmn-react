import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, getGradeWithComment } from '@/lib/utils';
import { Group, Nilai, Tugas, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import NilaiChangeValue from '../../nilai/components/nilai-change-value';
import TugasPopover from '../../tugas/components/tugas-popover';
import UserDetailPopover from '../../user/components/user-detail-popover';
import GroupLayout from '../layout/group-layout';

type Props = {
  enableToInput: boolean;
  nilais: Nilai[];
  tugases: Tugas[];
  members: User[];
};

const NilaiGroup: FC<Props> = ({ nilais = [], tugases = [], members = [], enableToInput }) => {
  const { group } = usePage<{ group: Group }>().props;

  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Nilai',
          href: route('group.nilai', group.id),
        },
      ]}
    >
      <HeadingSmall title="Nilai tugas anggota group" description="Nilai tugas" />
      <Table>
        <TableHeader>
          <TableHead className="border-r-2">Member name</TableHead>
          {tugases.map((tgs) => (
            <TableHead className="text-center">
              <TugasPopover tugas={tgs}>
                <span className="cursor-pointer">{tgs.rate}%</span>
              </TugasPopover>
            </TableHead>
          ))}
          <TableHead className="border-l-2 text-center font-mono">Total</TableHead>
          <TableHead className="text-center">Grade</TableHead>
          <TableHead>Comment</TableHead>
        </TableHeader>
        <TableBody>
          {members.map((mb) => {
            const totalNilai = tugases.reduce((total, tgs) => {
              const nilaiObj = nilais.find((nl) => nl.user_id === mb.id && nl.tugas_id === tgs.id);
              const nilai = nilaiObj?.nilai ?? 0;
              return total + (nilai * (parseInt(tgs.rate) ?? 0)) / 100;
            }, 0);

            // Dapatkan grade (dari total)
            const { passed, comment, grade } = getGradeWithComment(totalNilai);

            return (
              <TableRow>
                <TableCell className="border-r-2">
                  <UserDetailPopover user={mb} key={mb.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={mb.avatar} />
                      </Avatar>
                      {mb.name}
                    </div>
                  </UserDetailPopover>
                </TableCell>
                {tugases.map((tgs) => {
                  const { nilai } = nilais.find((nl) => nl.user_id === mb.id && nl.tugas_id === tgs.id) ?? { nilai: null };
                  const nilaiGrade = getGradeWithComment(nilai ?? 0);
                  return (
                    <TableCell className={cn('text-center font-mono', !nilaiGrade.passed && 'text-destructive')}>
                      <NilaiChangeValue userId={mb.id} tugasId={tgs.id} nilai={nilai} canEdit={enableToInput}>
                        <Button variant={'ghost'} size={'icon'}>
                          {nilai ?? '-'}
                        </Button>
                      </NilaiChangeValue>
                    </TableCell>
                  );
                })}
                <TableCell className={cn('border-l-2 text-center font-mono', !passed && 'text-destructive')}>
                  {Number(totalNilai.toFixed(2))}
                </TableCell>

                <TableCell className="text-center">{grade}</TableCell>
                <TableCell>{comment}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </GroupLayout>
  );
};

export default NilaiGroup;
