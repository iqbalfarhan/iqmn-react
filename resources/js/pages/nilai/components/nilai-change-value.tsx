import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { em } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  nilai: number | null;
  userId: number;
  tugasId: number;
  canEdit: boolean;
};

const NilaiChangeValue: FC<Props> = ({ children, nilai, userId, tugasId, canEdit }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post } = useForm({
    nilai: nilai ?? 0,
    user_id: userId,
    tugas_id: tugasId,
  });

  const handleUpdate = () => {
    post(route('nilai.store'), {
      preserveScroll: true,
      onError: (e) => toast.error(em(e)),
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {canEdit && (
        <PopoverContent className="w-24">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <Input
              value={data.nilai}
              onChange={(e) => setData('nilai', parseInt(e.target.value !== '' ? e.target.value : '0'))}
              className="w-full text-center"
            />
          </form>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default NilaiChangeValue;
