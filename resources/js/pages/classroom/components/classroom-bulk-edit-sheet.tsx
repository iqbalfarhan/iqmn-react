import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/submit-button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Classroom } from '@/types/classroom';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  classroomIds: Classroom['id'][];
  onSuccess?: () => void;
};

const ClassroomBulkEditSheet: FC<Props> = ({ children, classroomIds, onSuccess }) => {
  const { data, setData, put, processing } = useForm({
    classroom_ids: classroomIds,
  });

  useEffect(() => {
    setData('classroom_ids', classroomIds);
  }, [classroomIds, setData]);

  const handleSubmit = () => {
    put(route('classroom.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Classroom updated successfully');
        onSuccess?.();
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah classroom</SheetTitle>
          <SheetDescription>Ubah data {data.classroom_ids.length} classroom</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SubmitButton icon={Check} onClick={handleSubmit} label={`Simpan classroom`} loading={processing} disabled={processing} />
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

export default ClassroomBulkEditSheet;
