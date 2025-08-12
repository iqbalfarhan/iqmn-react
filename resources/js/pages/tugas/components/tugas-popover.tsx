import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dateDFY } from '@/lib/utils';
import { Tugas } from '@/types';
import { Link } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  tugas: Tugas;
};

const TugasPopover: FC<Props> = ({ children, tugas }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80" side="bottom">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>{tugas.rate}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-semibold">
              <Link href={route('tugas.show', tugas.id)}>{tugas.name}</Link>
            </h4>
            {/* <p className="text-sm">{tugas.description}</p> */}
            <p className="text-xs text-muted-foreground">{tugas.description}</p>
            <span className="text-xs">
              {dateDFY(tugas.created_at)} - bobot {tugas.rate}%
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TugasPopover;
