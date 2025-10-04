import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/submit-button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Assignment } from '@/types/assignment';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  assignmentIds: Assignment['id'][];
  onSuccess?: () => void;
};

const AssignmentBulkEditSheet: FC<Props> = ({ children, assignmentIds, onSuccess }) => {
  const { data, setData, put, processing } = useForm({
    assignment_ids: assignmentIds,
  });

  useEffect(() => {
    setData('assignment_ids', assignmentIds);
  }, [assignmentIds, setData]);

  const handleSubmit = () => {
    put(route('assignment.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Assignment updated successfully');
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
          <SheetTitle>Ubah assignment</SheetTitle>
          <SheetDescription>Ubah data {data.assignment_ids.length} assignment</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SubmitButton icon={Check} onClick={handleSubmit} label={`Simpan assignment`} loading={processing} disabled={processing} />
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

export default AssignmentBulkEditSheet;
