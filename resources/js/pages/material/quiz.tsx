import NoContent from '@/components/no-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { Group, Material, Quiz, QuizAnswer } from '@/types';
import { ArrowRight, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import QuizFormSheet from '../quiz/components/quiz-form-sheet';
import QuizItemCard from '../quiz/components/quiz-item-card';
import QuizResultDialog from '../quiz/components/quiz-result-dialog';

type Props = {
  quizzes: Quiz[];
  material: Material;
  group: Group;
  canEdit?: boolean;
};

const MaterialQuizzes: FC<Props> = ({ quizzes, group, material, canEdit = true }) => {
  const [openNilai, setOpenNilai] = useState(false);
  const [nilai, setNilai] = useState(0);
  const [answers, setAnswers] = useState<{ quizId: Quiz['id']; answer: QuizAnswer }[]>([]);

  const handleCheckAnswer = () => {
    if (quizzes.length === 0) return 0;

    let correct = 0;

    quizzes.forEach((quiz) => {
      const userAnswer = answers.find((a) => a.quizId === quiz.id);
      if (userAnswer?.answer === quiz.answer) {
        correct++;
      }
    });

    const score = Math.round((correct / quizzes.length) * 100);
    setNilai(score);
    setOpenNilai(true);
  };

  return (
    <AppLayout
      title="Quiz material"
      breadcrumbs={[
        { title: group.code, href: route('group.show', group.id) },
        { title: strLimit(material.name, 20), href: route('material.show', material.id) },
        { title: 'Quiz', href: route('material.quizzes', material.id) },
      ]}
      actions={
        <>
          {canEdit && (
            <QuizFormSheet purpose="create" materialId={material.id}>
              <Button>
                <Plus />
                Tambah pertanyaan
              </Button>
            </QuizFormSheet>
          )}
        </>
      }
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col space-y-6">
        {quizzes.length > 0 ? (
          <>
            {quizzes.map((q, index) => (
              <QuizItemCard
                key={index}
                quiz={q}
                canEdit={canEdit}
                onAnswer={(answer) =>
                  setAnswers((prev) => {
                    const quizId = q.id;
                    return prev.some((a) => a.quizId === quizId)
                      ? prev.map((a) => (a.quizId === quizId ? { quizId, answer } : a))
                      : [...prev, { quizId, answer }];
                  })
                }
              />
            ))}
            <div className="flex justify-between">
              <Button disabled variant={'ghost'}>
                {`${answers.length}/${quizzes.length}`} soal terisi
              </Button>
              <Button onClick={handleCheckAnswer} disabled={answers.length === quizzes.length ? false : true}>
                <span>Periksa jawaban</span>
                <ArrowRight />
              </Button>
            </div>
            <QuizResultDialog nilai={nilai} open={openNilai} onOpenChange={setOpenNilai} />
          </>
        ) : (
          <NoContent />
        )}
      </div>
    </AppLayout>
  );
};

export default MaterialQuizzes;
