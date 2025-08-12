import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import { Label } from './ui/label';

type FormControlProps = PropsWithChildren & {
  label?: string;
  hint?: string;
  className?: string;
  required?: boolean;
  action?: ReactNode;
};

const FormControl = ({ label, children, className, required, hint, action }: FormControlProps) => {
  return (
    <Label className={cn('flex flex-col space-y-2', className)}>
      {label && (
        <div className="flex justify-between">
          <div>
            {label} {required && <span className="text-destructive">*</span>}
          </div>
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}
      {children}
      {hint && <p className="flex gap-1 text-xs text-muted-foreground">{hint}</p>}
    </Label>
  );
};

export default FormControl;
