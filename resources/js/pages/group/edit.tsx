import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { Group } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';
import { toast } from 'sonner';
import GroupDeleteCard from './components/group-delete-card';
import GroupLayout from './layout/group-layout';

const EditGroup = () => {
  const { group } = usePage<{ canEditGroup: boolean; group: Group }>().props;

  const [dangerZone, setDangerZone] = useState<CheckedState>(false);

  const { data, setData, put } = useForm({
    name: group?.name ?? '',
    description: group?.description ?? '',
    code: group?.code ?? '',
    price: group?.price ?? '0',
  });

  const handleSubmit = () => {
    put(route('group.update', group?.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Group updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Anggota',
          href: route('group.member', group.id),
        },
      ]}
    >
      <HeadingSmall
        title="Pengaturan group"
        description="Ubah keterangan group"
        actions={
          <>
            <Label className="flex items-center gap-2">
              <Checkbox checked={dangerZone} onCheckedChange={setDangerZone} />
              Tampilkan danger zone
            </Label>
          </>
        }
      />
      <div className="mx-auto w-full max-w-lg space-y-10">
        {/* <Card>
          <CardHeader>
            <CardTitle>Pengaturan group</CardTitle>
            <CardDescription>Ubah keterangan group</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <Separator />
          <CardFooter className="justify-between"></CardFooter>
        </Card> */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Nama group">
            <Input type="text" placeholder="Nama group" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </FormControl>
          <FormControl label="Description">
            <Textarea placeholder="Keterangan group" value={data.description} onChange={(e) => setData('description', e.target.value)} />
          </FormControl>
          <FormControl label="Kode group">
            <Input type="text" placeholder="Kode group" value={data.code} onChange={(e) => setData('code', e.target.value)} />
          </FormControl>
          <FormControl label="Harga" hint="Isi harga dan otomatis group menjadi premium">
            <Input
              type="number"
              placeholder="Harga"
              value={data.price}
              onChange={(e) => setData('price', e.target.value !== '' ? parseInt(e.target.value) : 0)}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Simpan</Button>
        </form>

        <GroupDeleteCard group={group} open={dangerZone as boolean} onOpenChange={setDangerZone} />
      </div>
    </GroupLayout>
  );
};

export default EditGroup;
