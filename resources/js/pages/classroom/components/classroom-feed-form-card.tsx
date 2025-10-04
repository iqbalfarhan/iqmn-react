import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Paperclip } from 'lucide-react';

const ClassroomFeedFormCard = () => {
  const { permissions } = usePage<SharedData>().props;

  const { data, setData } = useForm({
    content: '',
  });

  if (!permissions?.classroomFeedCreate) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new feed</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControl hint={data.content.length + '/255 characters'}>
          <Textarea className="max-h-32" value={data.content} onChange={(e) => setData('content', e.target.value)} />
        </FormControl>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex">
          <Button variant={'ghost'} size={'icon'}>
            <Paperclip />
          </Button>
        </div>
        <Button>Post</Button>
      </CardFooter>
    </Card>
  );
};

export default ClassroomFeedFormCard;
