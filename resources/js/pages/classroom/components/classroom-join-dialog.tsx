import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Check, Plus } from 'lucide-react';

const ClassroomJoinDialog = () => {
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
          <InputOTP maxLength={6}>
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
          <Button>
            <Check />
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomJoinDialog;
