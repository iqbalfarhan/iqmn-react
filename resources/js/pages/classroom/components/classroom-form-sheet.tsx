import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em, generate6DigitCode } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Classroom, EnumVisibility } from '@/types/classroom';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  classroom?: Classroom;
  purpose: FormPurpose;
};

const ClassroomFormSheet: FC<Props> = ({ children, classroom, purpose }) => {
  const [open, setOpen] = useState(false);

  const {
    auth: { user },
  } = usePage<SharedData>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: classroom?.name ?? '',
    description: classroom?.description ?? '',
    url: classroom?.url ?? '',
    code: classroom?.code ?? generate6DigitCode(),
    user_id: user?.id,
    visibility: classroom?.visibility ?? 'private',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('classroom.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Classroom created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('classroom.update', classroom?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Classroom updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data classroom</SheetTitle>
          <SheetDescription>Form untuk {purpose} data classroom</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama classroom">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Description">
              <Textarea placeholder="Name" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Visibility">
              <Select value={data.visibility} onValueChange={(value) => setData('visibility', value as EnumVisibility)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} classroom`} loading={processing} disabled={processing} />
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

export default ClassroomFormSheet;
