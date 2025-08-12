import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { FormPurpose, Material, Quiz } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  materialId: Material['id'];
  quiz?: Quiz;
  purpose: FormPurpose;
};

const QuizFormSheet: FC<Props> = ({ children, quiz, purpose, materialId }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post } = useForm({
    material_id: materialId,
    question: quiz?.question ?? '',
    a: quiz?.a ?? '',
    b: quiz?.b ?? '',
    c: quiz?.c ?? '',
    answer: quiz?.answer ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('quiz.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Quiz created successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('quiz.update', quiz?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Quiz updated successfully');
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
          <SheetTitle>{purpose} data quiz</SheetTitle>
          <SheetDescription>Form untuk {purpose} data quiz</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Pertanyaan">
              <Textarea placeholder="Pertanyaan" value={data.question} onChange={(e) => setData('question', e.target.value)} />
            </FormControl>
            <FormControl label="Opsi A">
              <Input type="text" placeholder="opsi jawaban a" value={data.a} onChange={(e) => setData('a', e.target.value)} />
            </FormControl>
            <FormControl label="Opsi B">
              <Input type="text" placeholder="opsi jawaban b" value={data.b} onChange={(e) => setData('b', e.target.value)} />
            </FormControl>
            <FormControl label="Opsi C">
              <Input type="text" placeholder="opsi jawaban c" value={data.c} onChange={(e) => setData('c', e.target.value)} />
            </FormControl>
            <FormControl label="Jawaban">
              <Select value={data.answer} onValueChange={(v) => setData('answer', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jawaban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> {purpose} quiz
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

export default QuizFormSheet;
