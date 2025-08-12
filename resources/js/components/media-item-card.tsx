import { cn, copyMarkdownImage, em } from '@/lib/utils';
import { Media } from '@/types';
import { router } from '@inertiajs/react';
import { Copy, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type Props = {
  media: Media;
  className?: string;
};

const MediaItemCard: FC<Props> = ({ media, className }) => {
  const handleDeleteMedia = () => {
    router.delete(route('media.destroy', media.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('file deleted'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <div className={cn('group relative', className)}>
      <img src={media.original_url} className="aspect-auto h-full w-full rounded object-cover" />
      <div className="absolute bottom-0 hidden group-hover:block">
        <Button
          size={'icon'}
          onClick={() => {
            copyMarkdownImage(media.file_name, media.original_url);
          }}
        >
          <Copy />
        </Button>
        <Button size={'icon'} className="text-destructive" onClick={handleDeleteMedia}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default MediaItemCard;
