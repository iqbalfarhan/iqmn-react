import ArticleReader from '@/components/article-reader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Material, Quiz, QuizAnswer } from '@/types';
import { usePage } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';
import QuizDeleteDialog from './quiz-delete-dialog';
import QuizFormSheet from './quiz-form-sheet';

type Props = {
  quiz: Quiz;
  onAnswer?: (answer: QuizAnswer) => void;
  canEdit?: boolean;
};

const QuizItemCard: FC<Props> = ({ quiz, onAnswer, canEdit = false }) => {
  const { material } = usePage<{ material: Material }>().props;

  return (
    <Card className="group relative flex-1">
      <CardContent className="flex justify-between overflow-auto">
        <ArticleReader className="w-full" content={quiz.question} />
      </CardContent>
      <CardContent>
        <RadioGroup onValueChange={(v: QuizAnswer) => onAnswer?.(v)}>
          <Label className="flex items-start gap-3">
            <RadioGroupItem value="a" />
            <span>{quiz.a}</span>
          </Label>
          <Label className="flex items-start gap-3">
            <RadioGroupItem value="b" />
            <span>{quiz.b}</span>
          </Label>
          <Label className="flex items-start gap-3">
            <RadioGroupItem value="c" />
            <span>{quiz.c}</span>
          </Label>
        </RadioGroup>
      </CardContent>

      {canEdit && (
        <CardContent className="absolute right-0 flex justify-end opacity-0 group-hover:opacity-100">
          <QuizFormSheet purpose="edit" quiz={quiz} materialId={material.id}>
            <Button size={'icon'} variant={'ghost'}>
              <Edit />
            </Button>
          </QuizFormSheet>
          <QuizDeleteDialog quiz={quiz}>
            <Button size={'icon'} variant={'ghost'}>
              <Trash2 className="stroke-destructive" />
            </Button>
          </QuizDeleteDialog>
        </CardContent>
      )}
    </Card>
  );
};

export default QuizItemCard;
