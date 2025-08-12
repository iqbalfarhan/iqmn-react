import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { FormPurpose, Pembayaran } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  pembayaran?: Pembayaran;
  purpose: FormPurpose;
};

const PembayaranFormSheet: FC<Props> = ({ children, pembayaran, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset } = useForm({
    amount: pembayaran?.amount ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('pembayaran.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Pembayaran created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('pembayaran.update', pembayaran?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Pembayaran updated successfully');
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
          <SheetTitle>{purpose} data pembayaran</SheetTitle>
          <SheetDescription>Form untuk {purpose} data pembayaran</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama pembayaran">
              <Input type="text" placeholder="Name" value={data.amount} onChange={(e) => setData('amount', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> {purpose} pembayaran
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

export default PembayaranFormSheet;
