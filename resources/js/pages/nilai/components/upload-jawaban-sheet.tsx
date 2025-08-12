import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { em, handlePasteScreenshot, strLimit } from '@/lib/utils';
import { Media, Nilai, Tugas } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { File, Trash2, Upload, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  nilai?: Nilai;
  tugas: Tugas;
};

const UploadJawabanSheet: FC<Props> = ({ children, nilai, tugas }) => {
  const [open, setOpen] = useState(false);

  const formLabel = nilai ? 'Edit' : 'Upload';

  const { data, setData, post } = useForm({
    jawaban: nilai?.jawaban ?? '',
    tugas_id: tugas.id,
    lampiran: undefined as File | undefined,
  });

  const handleSubmit = () => {
    post(route('nilai.store-jawaban'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Nilai created successfully');
        setOpen(false);
        setData('lampiran', undefined);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  useEffect(() => {
    const cleanup = handlePasteScreenshot((file) => {
      setData('lampiran', file);
    });

    return cleanup;
  }, [setData]);

  const handleDeleteLampiran = (id: Media['id']) => {
    router.delete(route('media.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('file deleted');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{formLabel} jawaban</SheetTitle>
          <SheetDescription>Form untuk upload jawaban tugas</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Jawaban" required>
              <Textarea
                placeholder="Tulis jawaban disini"
                value={data.jawaban}
                onChange={(e) => setData('jawaban', e.target.value)}
                className="min-h-24"
              />
            </FormControl>
            <FormControl label="Upload lampiran" hint="Atau paste file disini">
              <Input type="file" placeholder="Name" onChange={(e) => setData('lampiran', e.target.files?.[0])} />
              {data.lampiran && <img src={URL.createObjectURL(data.lampiran)} className="mt-2 aspect-video w-full rounded-md object-cover" />}
            </FormControl>
            {(nilai?.media ?? []).length > 0 && (
              <>
                <FormControl label="Lampiran" hint="Klik pada item lampiran untuk hapus">
                  <div className="flex flex-wrap gap-1">
                    {nilai?.media?.map((m) => (
                      <Button type="button" size={'sm'} key={m.id} onClick={() => handleDeleteLampiran(m.id)}>
                        <Trash2 />
                        {strLimit(m.file_name, 20)}
                      </Button>
                    ))}
                  </div>
                </FormControl>
              </>
            )}
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Upload /> Upload jawaban
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

export default UploadJawabanSheet;
