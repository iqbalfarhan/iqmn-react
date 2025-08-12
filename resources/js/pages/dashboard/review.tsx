import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Review } from '@/types';
import { useForm } from '@inertiajs/react';
import { Send, Star } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  review?: Review;
};

const ReviewApp: FC<Props> = ({ review }) => {
  const { data, setData, post } = useForm({
    comment: review?.comment ?? '',
    rating: review?.rating ?? 0,
  });

  const handleSubmit = () => {
    post(route('review.store'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Review submitted successfully'),
    });
  };

  return (
    <AppLayout
      title="Review aplikasi"
      description="Terima kasih telah menggunakan aplikasi ini"
      breadcrumbs={[
        {
          title: 'Dashboard',
          href: route('dashboard'),
        },
        {
          title: 'Review',
          href: route('review'),
        },
      ]}
    >
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Review aplikasi ini</CardTitle>
          <CardDescription>Terima kasih telah menggunakan aplikasi ini</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <FormControl label="Review">
              <Textarea value={data.comment} placeholder="Tulis reviewmu disini" onChange={(e) => setData('comment', e.target.value)} />
            </FormControl>
            <FormControl label="Rating">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn('size-5', i < data.rating ? 'fill-yellow-500 stroke-yellow-500' : 'fill-muted stroke-yellow-500/30')}
                    onClick={() => setData('rating', i + 1)}
                  />
                ))}
              </div>
            </FormControl>
          </form>
        </CardContent>
        <Separator />
        <CardFooter>
          <Button onClick={handleSubmit}>
            <Send />
            Post review
          </Button>
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default ReviewApp;
