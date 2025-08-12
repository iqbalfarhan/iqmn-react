import ArticleReader from '@/components/article-reader';
import FormControl from '@/components/form-control';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn, dateDFYHIS, getGradeWithComment, strLimit } from '@/lib/utils';
import { Nilai } from '@/types';
import { File, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  nilai?: Nilai;
};

const DetailNilaiSheet: FC<Props> = ({ children, nilai }) => {
  const { passed, comment } = getGradeWithComment(nilai?.nilai ?? 0);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detail nilai</SheetTitle>
          <SheetDescription>Detail nilai</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto px-4">
          <div className="space-y-8">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Avatar className="size-24">
                <AvatarFallback className={cn('text-3xl font-bold', !passed && 'text-destructive')}>{nilai?.nilai}</AvatarFallback>
              </Avatar>

              <p className="text-center font-bold">{comment}</p>
            </div>
            <FormControl label="Tanggal kumpul">
              <p>{dateDFYHIS(nilai?.created_at ?? '-')}</p>
            </FormControl>
            <FormControl label="Jawaban">
              <ArticleReader content={nilai?.jawaban ?? ''} className="prose-sm text-wrap" />
            </FormControl>
            {(nilai?.media ?? []).length > 0 && (
              <FormControl label="Lampiran">
                <div className="flex flex-wrap gap-1">
                  {nilai?.media?.map((m) => (
                    <Button size={'sm'} asChild>
                      <a target="_blank" href={m.original_url}>
                        <File />
                        {strLimit(m.file_name, 20)}
                      </a>
                    </Button>
                  ))}
                </div>
              </FormControl>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={'secondary'}>
              <X />
              Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DetailNilaiSheet;
