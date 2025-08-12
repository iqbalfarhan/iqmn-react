import InputIcon from '@/components/input-icon';
import NoContent from '@/components/no-content';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn, dateDFY, getGradeWithComment, strLimit } from '@/lib/utils';
import { Nilai, Tugas } from '@/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Edit, Folder, Upload } from 'lucide-react';
import { FC, useState } from 'react';
import DetailNilaiSheet from '../nilai/components/detail-nilai-sheet';
import UploadJawabanSheet from '../nilai/components/upload-jawaban-sheet';
import TugasPopover from '../tugas/components/tugas-popover';

type Props = {
  tugases: Tugas[];
  nilais: Nilai[];
};

const DaftarTugas: FC<Props> = ({ tugases, nilais }) => {
  const [onlyAvailable, setOnlyAvailable] = useState<CheckedState>(true);
  return (
    <AppLayout
      title="List tugas anda"
      breadcrumbs={[
        {
          title: 'Dashboard',
          href: route('dashboard'),
        },
        {
          title: 'Daftar tugas',
          href: route('dashboard.daftar-tugas'),
        },
      ]}
    >
      <div className="flex justify-between gap-4">
        <InputIcon placeholder="Pencarian..." />
        <Button className="flex items-center gap-2 hover:!bg-transparent" variant={'ghost'} asChild>
          <Label>
            <Checkbox defaultChecked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
            Hanya nampilin tugas aktif
          </Label>
        </Button>
      </div>
      {tugases.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead className="pl-6">Judul tugas</TableHead>
              <TableHead>Batas kumpul</TableHead>
              <TableHead>Status sesi</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tugases
              .filter((t) => (onlyAvailable ? t.available === true : true))
              .map((t) => {
                const n = nilais.find((n) => n.tugas_id === t.id);
                const nilai = n?.nilai;
                const jawaban = nilais.find((n) => n.tugas_id === t.id)?.jawaban;

                const { passed } = getGradeWithComment(nilai ?? 0);
                const avail = t.available;

                return (
                  <TableRow key={t.id} className={cn(!avail && 'opacity-50')}>
                    <TableCell>{strLimit(t.group?.code, 20)}</TableCell>
                    <TableCell>
                      <TugasPopover tugas={t}>
                        <Button variant={'ghost'}>{strLimit(t.name)}</Button>
                      </TugasPopover>
                    </TableCell>
                    <TableCell>{t.limit_date && dateDFY(t.limit_date)}</TableCell>
                    <TableCell>{!t.available && 'ditutup'}</TableCell>
                    <TableCell className={!passed ? 'text-destructive' : ''}>
                      <Button variant={'ghost'} size={'icon'}>
                        {nilai ?? '-'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {jawaban && (
                        <DetailNilaiSheet nilai={n}>
                          <Button variant={'ghost'}>
                            <Folder />
                            Detail
                          </Button>
                        </DetailNilaiSheet>
                      )}
                    </TableCell>
                    <TableCell>
                      <UploadJawabanSheet nilai={n} tugas={t}>
                        <Button variant={'ghost'} disabled={!avail}>
                          {n ? (
                            <>
                              <Edit />
                              Edit
                            </>
                          ) : (
                            <>
                              <Upload />
                              Upload
                            </>
                          )}
                        </Button>
                      </UploadJawabanSheet>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <NoContent />
      )}
    </AppLayout>
  );
};

export default DaftarTugas;
