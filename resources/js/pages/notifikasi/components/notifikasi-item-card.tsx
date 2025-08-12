import { Notifikasi } from '@/types';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CheckCheck, ExternalLink } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';

interface Props {
  notifikasi: Notifikasi;
}

const NotifikasiItemCard: FC<Props> = ({ notifikasi }) => {
  const handleClikNotifikasi = () => {
    router.put(route('notifikasi.update', notifikasi.id), { read: true }, { preserveScroll: true });
  };

  const handleVisitLink = () => {
    handleClikNotifikasi();
    router.visit(notifikasi.link);
  };

  return (
    <Card className="group rounded-none border-0 border-b bg-transparent pb-0 transition-all hover:pb-6">
      <CardHeader className="z-10">
        <div className="flex items-center justify-between">
          <CardTitle>{notifikasi.title}</CardTitle>
          <span>{notifikasi.read && <CheckCheck className="size-4 text-primary" />}</span>
        </div>
        <CardDescription>{notifikasi.content}</CardDescription>
      </CardHeader>
      <CardFooter className="z-0 h-0 justify-between opacity-0 group-hover:h-fit group-hover:opacity-100">
        <Button variant={'outline'} size={'sm'} onClick={handleVisitLink}>
          <ExternalLink />
          Buka link
        </Button>
        <span className="text-xs text-muted-foreground">{dayjs(notifikasi.created_at).fromNow()}</span>
      </CardFooter>
    </Card>
  );
};

export default NotifikasiItemCard;
