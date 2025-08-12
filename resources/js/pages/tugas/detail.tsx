import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn, dateDFY, dateDFYHIS, getGradeWithComment, strLimit } from '@/lib/utils';
import { Nilai, Tugas } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Folder } from 'lucide-react';
import { FC } from 'react';
import DetailNilaiSheet from '../nilai/components/detail-nilai-sheet';
import NilaiChangeValue from '../nilai/components/nilai-change-value';
import UserDetailPopover from '../user/components/user-detail-popover';
import TugasFormSheet from './components/tugas-form-sheet';

type Props = {
  tugas: Tugas;
  nilais: Nilai[];
  canEdit: boolean;
};

const DetailTugas: FC<Props> = ({ tugas, nilais, canEdit = false }) => {
  return (
    <AppLayout
      title={'Detail tugas'}
      description={`Tugas dari group : ${tugas.group?.name}`}
      breadcrumbs={[
        {
          title: tugas.group?.code ?? '',
          href: route('group.tugas', tugas.group?.id),
        },
        {
          title: 'Tugas',
          href: route('group.tugas', tugas.group?.id),
        },
        {
          title: strLimit(tugas.name, 20),
          href: route('tugas.show', tugas.id),
        },
      ]}
      actions={
        <>
          {canEdit && (
            <TugasFormSheet purpose="edit" tugas={tugas}>
              <Button>
                <Edit />
                Edit tugas
              </Button>
            </TugasFormSheet>
          )}
        </>
      }
    >
      <div>
        <Button asChild>
          <Link href={route('group.tugas', tugas.group?.id)}>
            <ArrowLeft />
            Kembali ke list tugas
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tugas.name}</CardTitle>
          <CardDescription>{tugas.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter className="flex gap-2">
          {tugas.limit_date && (
            <Button variant={'secondary'}>
              <Calendar />
              Batas pengumpulan : {dateDFY(tugas.limit_date)}
            </Button>
          )}
          <Button variant={'secondary'}>Bobot : {tugas.rate}%</Button>
        </CardFooter>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama member</TableHead>
            <TableHead>Tanggal kumpul</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Comment</TableHead>
            {canEdit && <TableHead>Detail</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {nilais.map((n) => {
            const { grade, comment, passed } = getGradeWithComment(n.nilai);
            return (
              <TableRow key={n.id}>
                <TableCell>
                  <UserDetailPopover user={n.user}>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={n.user.avatar} />
                      </Avatar>
                      {n.user?.name}
                    </div>
                  </UserDetailPopover>
                </TableCell>
                <TableCell>{dateDFYHIS(n?.created_at)}</TableCell>
                <TableCell className={cn(!passed && 'text-destructive')}>
                  <NilaiChangeValue canEdit={canEdit} userId={n.user_id} tugasId={n.tugas_id} nilai={n.nilai}>
                    <Button size={'icon'} variant={'ghost'}>
                      {n.nilai ?? '-'}
                    </Button>
                  </NilaiChangeValue>
                </TableCell>
                <TableCell>{grade}</TableCell>
                <TableCell>{comment}</TableCell>
                {canEdit && (
                  <TableCell>
                    {n && (
                      <DetailNilaiSheet nilai={n}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Folder />
                        </Button>
                      </DetailNilaiSheet>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default DetailTugas;
