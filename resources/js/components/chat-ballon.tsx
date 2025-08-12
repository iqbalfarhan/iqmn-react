import { strLimit } from '@/lib/utils';
import { Chat, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import ArticleReader from './article-reader';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';

type Props = {
  chat: Chat;
};

const ChatBallon: FC<Props> = ({ chat }) => {
  const { auth } = usePage<SharedData>().props;

  const user = chat.user;

  const handleDeleteChat = () => {
    if (auth.user.id !== user.id) return null;

    if (confirm('apakah anda yakin untuk menghapus chat ini?')) {
      router.delete(route('chat.destroy', chat.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <>
      <div className="flex gap-4" onDoubleClick={handleDeleteChat}>
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(1)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between">
            <h4 className="text-xs text-muted-foreground">{strLimit(user.name, 20)}</h4>
            <DropdownMenu>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteChat} variant="destructive">
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h5 className="text-right text-xs text-muted-foreground">{dayjs(chat.created_at).format('D-MMM-YY H:m')}</h5>
          </div>
          <ArticleReader content={chat.message} className="prose-sm max-w-full !text-wrap break-all" />
          {/* <p className="max-w-full text-wrap break-all">{chat.message}</p> */}
        </div>
      </div>
    </>
  );
};

export default ChatBallon;
