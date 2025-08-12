import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  title?: string;
  description?: string;
  align?: 'center' | 'left' | null;
  className?: string;
};

const SectionContainer: FC<Props> = ({ children, title, description, align = 'center', className }) => {
  return (
    <div className={cn('mx-auto w-full max-w-6xl space-y-16 px-4 py-24', className)}>
      {align == 'center' && (
        <div className="mx-auto max-w-xl space-y-4 text-center">
          {title && <h1 className="text-4xl font-bold">{title}</h1>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {align == 'left' && (
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold">{title}</h1>
          <p>{description}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionContainer;
