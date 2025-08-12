import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dateDFY } from '@/lib/utils';
import { User } from '@/types';
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  user: User;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const UserDetailPopover: FC<Props> = ({ children, user, side = 'bottom' }) => {
  const socmed = user.socmed;
  return (
    <Popover>
      {children ? (
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      ) : (
        <PopoverTrigger className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={user.avatar} />
          </Avatar>
          {user.name}
        </PopoverTrigger>
      )}
      <PopoverContent className="w-80" side={side} align="start">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
          </Avatar>
          <div className="w-full space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <div className="text-xs text-muted-foreground">
              {user.email} as {user.roles?.join(', ')} join since {dateDFY(user.created_at)}.
            </div>
            {socmed && (
              <div className="flex w-fit items-center justify-center text-xs">
                {socmed?.github && (
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <a href={socmed.github} target="_blank">
                      <Github />
                    </a>
                  </Button>
                )}
                {socmed?.linkedin && (
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <a href={socmed.linkedin} target="_blank">
                      <Linkedin />
                    </a>
                  </Button>
                )}
                {socmed?.youtube && (
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <a href={socmed.youtube} target="_blank">
                      <Youtube />
                    </a>
                  </Button>
                )}
                {socmed?.instagram && (
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <a href={socmed.instagram} target="_blank">
                      <Instagram />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserDetailPopover;
