import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { em } from '@/lib/utils';
import { Group } from '@/types';
import { router } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { AlertCircle, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  group: Group;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const GroupDeleteDialog: FC<Props> = ({ group, open, onOpenChange }) => {
  const [agree, setAgree] = useState<CheckedState>(false);

  const handleDelete = () => {
    router.delete(route('group.delete-to-dashboard', group.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Group deleted successfully');
        onOpenChange?.(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus group</DialogTitle>
          <DialogDescription>Menghapus group akan menghapus semua data terkait group ini.</DialogDescription>
        </DialogHeader>
        <Alert>
          <AlertCircle />
          <AlertDescription>
            Data terkait akan dihapus secara otomatis dan tidak dapat dikembalikan. data yang dihapus berupa material group, tugas group, nilai
            anggota, dan anggota otomatis keluar dari group ini.
          </AlertDescription>
        </Alert>
        <Label className="flex items-center gap-2">
          <Checkbox checked={agree} onCheckedChange={setAgree} />
          Saya menyetujui
        </Label>
        <DialogFooter>
          <Button variant="destructive" disabled={!agree} onClick={handleDelete}>
            <Trash2 /> Hapus group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDeleteDialog;
