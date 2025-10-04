import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { Classroom } from '@/types/classroom';
import { useForm } from '@inertiajs/react';
import { FC } from 'react';
import { toast } from 'sonner';
import ClassroomUploadMediaSheet from './components/classroom-upload-sheet';

type Props = {
  classroom: Classroom;
};

const EditClassroom: FC<Props> = ({ classroom }) => {
  const { data, setData, put } = useForm({
    name: classroom.name,
    description: classroom.description,
    code: classroom.code,
  });

  const handleUpdate = () => {
    put(route('classroom.update', classroom.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Classroom updated successfully');
      },
      onError: (e) => {
        toast.error(em(e));
      },
    });
  };
  return (
    <AppLayout title={`Edit ${classroom.name}`} description="Edit classroom">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Classroom</CardTitle>
            <CardDescription className="line-clamp-1">Edit classroom {classroom.name}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            <FormControl label="Name">
              <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Description">
              <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-32" />
            </FormControl>
            <FormControl label="Kode join">
              <InputOTP maxLength={6} value={data.code} onChange={(e) => setData('code', e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button onClick={handleUpdate}>Update</Button>
          </CardFooter>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Classroom cover image</CardTitle>
            <CardDescription>Upload cover image for classroom</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <ClassroomUploadMediaSheet classroom={classroom}>
              {classroom.cover ? (
                <img src={classroom.cover} alt="" className="h-48 w-full rounded-lg object-cover" />
              ) : (
                <Skeleton className="h-48 w-full" />
              )}
            </ClassroomUploadMediaSheet>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditClassroom;
