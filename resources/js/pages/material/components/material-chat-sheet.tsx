import ChatBallon from '@/components/chat-ballon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { em } from '@/lib/utils';
import { Chat, Material } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  materialId: Material['id'];
};

const MaterialChatSheet: FC<Props> = ({ children, materialId }) => {
  const { chats } = usePage<{ chats: Chat[] }>().props;

  const { data, setData, post, processing } = useForm({
    message: '',
    material_id: materialId,
  });

  const isMobile = useIsMobile();

  const handleSubmit = () => {
    post(route('chat.store'), {
      preserveScroll: true,
      onSuccess: () => setData('message', ''),
      onError: (e) => toast.error(em(e)),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault(); // Biar gak nambah newline
      handleSubmit();
    }
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        scrollToBottom();
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={isMobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>Material discussion</SheetTitle>
          <SheetDescription>Double click untuk menghapus chat anda</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4 px-4" ref={chatContainerRef}>
            {chats.map((c) => (
              <ChatBallon chat={c} key={c.id} />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Textarea
              className="scrollbar-hidden !max-h-9 !min-h-9"
              placeholder="Tulis disini"
              value={data.message}
              onKeyDown={handleKeyDown}
              onChange={(e) => setData('message', e.target.value)}
              disabled={processing}
            />
            <Button size={'icon'}>
              <Send />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MaterialChatSheet;
