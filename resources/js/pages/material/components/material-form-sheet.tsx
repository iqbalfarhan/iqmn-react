import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Classroom } from '@/types/classroom';
import { Material } from '@/types/material';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  material?: Material;
  purpose: FormPurpose;
};

const MaterialFormSheet: FC<Props> = ({ children, material, purpose }) => {
  const [open, setOpen] = useState(false);

  const { classroom } = usePage<{ classroom: Classroom }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: material?.name ?? '',
    classroom_id: classroom?.id,
    description: material?.description ?? '',
    visible: material?.visible ?? true,
    url: material?.url ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('material.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('material.update', material?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data material</SheetTitle>
          <SheetDescription>Form untuk {purpose} data material</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama material">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Input type="text" placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="URL">
              <Input type="text" placeholder="URL" value={data.url} onChange={(e) => setData('url', e.target.value)} />
            </FormControl>
            <FormControl label="Visible">
              <Switch checked={data.visible} onCheckedChange={(e) => setData('visible', e)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} material`} loading={processing} disabled={processing} />
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

export default MaterialFormSheet;
