import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { FormPurpose, Role } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  role?: Role;
  purpose: FormPurpose;
};

const RoleFormSheet: FC<Props> = ({ children, role, purpose }) => {
  const [open, setOpen] = useState(false);
  const { permissions } = usePage<{ permissions: string[] }>().props;

  const { data, setData, put, post, reset } = useForm({
    name: role?.name ?? '',
    permissions: role?.permissions ?? [],
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('role.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Role created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('role.update', role?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Role updated successfully');
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  const [cariPermission, setCariPermission] = useState('');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{purpose} data role</SheetTitle>
          <SheetDescription>Form untuk {purpose} data role</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama role">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="List permissions">
              <Input placeholder="cari role" value={cariPermission} onChange={(e) => setCariPermission(e.target.value)} />
              {permissions
                .filter((r) => r.toLowerCase().includes(cariPermission.toLowerCase()))
                .map((role) => (
                  <Label key={role} className="flex h-6 items-center gap-2">
                    <Checkbox
                      checked={data.permissions.includes(role)}
                      onCheckedChange={() =>
                        setData({
                          ...data,
                          permissions: data.permissions.includes(role) ? data.permissions.filter((r) => r !== role) : [...data.permissions, role],
                        })
                      }
                    />
                    <span>{role}</span>
                  </Label>
                ))}
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> {purpose === 'create' ? 'Tambah role' : 'Simpan perubahan'}
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RoleFormSheet;
