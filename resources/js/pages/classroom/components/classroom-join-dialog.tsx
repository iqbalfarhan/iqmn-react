import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { em } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import { toast } from 'sonner';

const ClassroomJoinDialog = () => {
  const { data, setData, post } = useForm({
    code: '',
  });

  const handleSubmit = () => {
    post(route('classroom.join'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Classroom joined successfully'),
      onError: (e) => toast.error(em(e)),
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size={'lg'}>
          <Plus />
          Join classroom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join classroom</DialogTitle>
          <DialogDescription>Enter the code to join the classroom</DialogDescription>
        </DialogHeader>
        <div className="mx-auto my-4">
          <InputOTP maxLength={6} value={data.code} onChange={(e) => setData('code', e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={data.code.length !== 6}>
            <Check />
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomJoinDialog;
