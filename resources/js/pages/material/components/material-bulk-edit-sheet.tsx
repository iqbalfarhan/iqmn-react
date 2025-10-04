import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Material } from '@/types/material';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  materialIds: Material['id'][];
  onSuccess?: () => void;
};

const MaterialBulkEditSheet: FC<Props> = ({ children, materialIds, onSuccess }) => {
  const { data, setData, put, processing } = useForm({
    material_ids: materialIds,
  });

  useEffect(() => {
    setData('material_ids', materialIds);
  }, [materialIds, setData]);

  const handleSubmit = () => {
    put(route('material.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Material updated successfully');
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
          <SheetTitle>Ubah material</SheetTitle>
          <SheetDescription>Ubah data {data.material_ids.length} material</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SubmitButton icon={Check} onClick={handleSubmit} label={`Simpan material`} loading={processing} disabled={processing} />
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

export default MaterialBulkEditSheet;
