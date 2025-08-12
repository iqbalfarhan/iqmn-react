import FormControl from '@/components/form-control';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { FormPurpose, Group } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, Info, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  group?: Group;
  purpose: FormPurpose;
};

const GroupFormSheet: FC<Props> = ({ children, group, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset } = useForm({
    name: group?.name ?? '',
    description: group?.description ?? '',
    code: group?.code ?? '',
    price: group?.price ?? '0',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('group.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Group created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('group.update', group?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Group updated successfully');
          setOpen(false);
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
          <SheetTitle>{purpose} data group</SheetTitle>
          <SheetDescription>Form untuk {purpose} data group</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama group">
              <Input type="text" placeholder="Nama group" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Description">
              <Textarea placeholder="Keterangan group" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Kode group">
              <Input type="text" placeholder="Kode group" value={data.code} onChange={(e) => setData('code', e.target.value)} />
            </FormControl>
            <FormControl label="Harga">
              <Input
                type="number"
                placeholder="Harga"
                value={data.price}
                onChange={(e) => setData('price', e.target.value !== '' ? e.target.value : 0)}
              />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Alert>
            <Info />
            <AlertTitle>Kode group</AlertTitle>
            <AlertDescription>
              Kode group akan digunakan untuk join group. Baiknya diisi dengan kombinasi huruf dan angka sepanjang 6 karakter.
            </AlertDescription>
          </Alert>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan
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

export default GroupFormSheet;
