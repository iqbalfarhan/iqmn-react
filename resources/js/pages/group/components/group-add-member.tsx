import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { em } from '@/lib/utils';
import { Group } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren;

const GroupAddMember: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { group } = usePage<{ group: Group }>().props;

  const { data, setData, post } = useForm({
    email: '',
  });

  const handleSubmit = () => {
    post(route('group.add-member', group.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil menambahkan pengguna');
        setData('email', '');
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
          <DialogTitle>Tambah member</DialogTitle>
          <DialogDescription>Tambah member untuk group {group.name}</DialogDescription>
        </DialogHeader>
        <form
          className="py-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Email pengguna">
            <Input type="email" placeholder="Tulis email disini" value={data.email} onChange={(e) => setData('email', e.target.value)} />
          </FormControl>
        </form>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            <Check />
            Tambahkan penggua
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupAddMember;
