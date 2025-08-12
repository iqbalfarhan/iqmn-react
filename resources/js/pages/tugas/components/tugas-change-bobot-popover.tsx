import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { em } from '@/lib/utils';
import { Tugas } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  tugas: Tugas;
  canEdit: boolean;
};

const TugasChangeBobotPopover: FC<Props> = ({ children, tugas, canEdit }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, put } = useForm({
    rate: tugas.rate ?? '0',
  });

  const handleUpdate = () => {
    put(route('tugas.update', tugas.id), {
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
            <Input value={data.rate} onChange={(e) => setData('rate', e.target.value !== '' ? e.target.value : '0')} className="w-full text-center" />
          </form>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default TugasChangeBobotPopover;
