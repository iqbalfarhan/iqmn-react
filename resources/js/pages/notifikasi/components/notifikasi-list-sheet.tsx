import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, CheckCheck, Ellipsis, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../../../components/ui/sheet';
import NotifikasiItemCard from './notifikasi-item-card';

const NotifikasiListSheet = () => {
  const {
    notifikasis,
    auth: { user },
  } = usePage<SharedData>().props;

  const unread = notifikasis.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    router.put(route('notifikasi.update-all'), { read: true }, { preserveScroll: true });
  };

  const markAllAsUnead = () => {
    router.put(route('notifikasi.update-all'), { read: false }, { preserveScroll: true });
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="hidden md:flex">
        <Button variant={'outline'} size={'icon'} className={'relative'}>
          <Bell className={cn(unread > 0 && 'animate-pulse')} />
          {unread > 0 && <div className="absolute top-2 right-2 h-2 w-2 animate-pulse rounded-full bg-primary" />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifikasi</SheetTitle>
          <SheetDescription>Klik untuk menandakan sudah dibaca</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <Separator />
          <div className="pb-4">
            {notifikasis.map((n) => (
              <NotifikasiItemCard notifikasi={n} key={n.id} />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter className="flex flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'icon'} variant={'outline'}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem onClick={markAllAsRead}>
                <CheckCheck className="text-primary" />
                Tandai semua sudah dibaca
              </DropdownMenuItem>
              <DropdownMenuItem onClick={markAllAsUnead}>
                <CheckCheck />
                Tandai semua belum dibaca
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="flex-1" variant={'outline'}>
            <Link href={route('notifikasi.destroy-all', user.id)} method="delete">
              <Trash2 />
              Hapus semua notifikasi
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NotifikasiListSheet;
