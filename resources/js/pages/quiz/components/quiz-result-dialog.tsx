import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn, getGradeWithComment } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  nilai: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const QuizResultDialog: FC<Props> = ({ nilai, ...other }) => {
  const { passed, comment, emoticon } = getGradeWithComment(nilai);
  return (
    <Dialog {...other}>
      <DialogContent>
        <div className="flex w-full flex-col items-center justify-center space-y-12">
          <DialogTitle className="text-2xl">{comment}</DialogTitle>
          <p className="text-9xl">{emoticon}</p>
          <div className="text-center">
            <p>Nilai kamu:</p>
            <h1 className={cn('text-xl font-bold', !passed && 'text-destructive')}>{nilai}/100</h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizResultDialog;
