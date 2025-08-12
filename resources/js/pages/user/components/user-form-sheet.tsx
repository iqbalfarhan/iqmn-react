import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { FormPurpose, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  user?: User;
  purpose: FormPurpose;
};

const UserFormSheet: FC<Props> = ({ children, user, purpose }) => {
  const [open, setOpen] = useState(false);
  const { roles } = usePage<{ roles: string[] }>().props;

  const { data, setData, put, post, reset } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: user ? undefined : 'password',
    roles: user?.roles ?? [],
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('user.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('User created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('user.update', user?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('User updated successfully');
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  const [cariRole, setCariRole] = useState('');
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{purpose} data user</SheetTitle>
          <SheetDescription>Form untuk {purpose} data user</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama user">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email">
              <Input type="email" placeholder="email address" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Password">
              <Input type="password" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
            </FormControl>
            <FormControl label="Role user">
              <Input placeholder="cari role" value={cariRole} onChange={(e) => setCariRole(e.target.value)} />
              {roles
                .filter((r) => r.toLowerCase().includes(cariRole.toLowerCase()))
                .map((role) => (
                  <Label key={role} className="flex h-6 items-center gap-2">
                    <Checkbox
                      checked={data.roles.includes(role)}
                      onCheckedChange={() =>
                        setData({
                          ...data,
                          roles: data.roles.includes(role) ? data.roles.filter((r) => r !== role) : [...data.roles, role],
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
            <Check /> Simpan {purpose == 'edit' ? 'perubahan' : 'data'}
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

export default UserFormSheet;
