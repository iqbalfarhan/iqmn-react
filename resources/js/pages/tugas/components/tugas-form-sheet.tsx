import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { FormPurpose, Group, Tugas } from '@/types';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  groupId?: Group['id'];
  tugas?: Tugas;
  purpose: FormPurpose;
};

const TugasFormSheet: FC<Props> = ({ children, tugas, purpose, groupId }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset } = useForm({
    group_id: groupId,
    name: tugas?.name ?? '',
    description: tugas?.description ?? '',
    limit_date: tugas?.limit_date ?? '',
    rate: tugas?.rate ?? '',
    available: (tugas?.available ?? true) as boolean,
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('tugas.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Tugas created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('tugas.update', tugas?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Tugas updated successfully');
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{purpose} data tugas</SheetTitle>
          <SheetDescription>Form untuk {purpose} data tugas</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama tugas">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Deskripsi tugas" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Batas pengumpulan">
              <DatePicker
                value={data.limit_date ? dayjs(data.limit_date).toDate() : undefined}
                onValueChange={(date) => setData('limit_date', dayjs(date).format('YYYY-MM-DD'))}
              />
            </FormControl>
            <FormControl label="Bobot %">
              <Input type="number" placeholder="Tulis bobot tugas dalam persen" value={data.rate} onChange={(e) => setData('rate', e.target.value)} />
            </FormControl>
            <FormControl label="Status sesi tugas" hint="Bila status sesi tugas ditutup, peserta tidak bisa mengupload dan mengubah jawaban">
              <Label className="flex h-9 items-center gap-2">
                <Checkbox checked={data.available} onCheckedChange={(c: boolean) => setData('available', c)} />
                <span>Buka sesi tugas</span>
              </Label>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan {purpose == 'edit' ? 'perubahan' : 'tugas'}
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TugasFormSheet;
