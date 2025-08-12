import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { em } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  code?: string;
};

const GroupJoinForm: FC<Props> = ({ children, code }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, post, reset } = useForm({
    code: code ?? '',
  });

  const handleJoin = () => {
    post(route('group.join'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil gabung group');
        reset();
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join group</DialogTitle>
          <DialogDescription>Gabung group dengan kode group</DialogDescription>
        </DialogHeader>
        <Input type="text" placeholder="kode group" value={data.code} onChange={(e) => setData('code', e.target.value)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batalin
            </Button>
          </DialogClose>
          <Button onClick={handleJoin}>
            <Check />
            Gabung
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupJoinForm;
