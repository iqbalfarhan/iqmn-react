import { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function HeadingSmall({ title, description, actions }: Props) {
  return (
    <header className="flex flex-col justify-between gap-2 md:flex-row">
      <div>
        <h3 className="mb-0.5 text-base font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-row space-x-2">{actions}</div>}
    </header>
  );
}
