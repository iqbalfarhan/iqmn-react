import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SettingsLayout from '@/layouts/settings/layout';
import { em } from '@/lib/utils';
import { BreadcrumbItem, Socmed } from '@/types';
import { useForm } from '@inertiajs/react';
import { FC } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan user',
    href: route('profile.edit'),
  },
  {
    title: 'Social media',
    href: route('socmed.index'),
  },
];

type Props = {
  socmed?: Socmed;
};

const SocialMedia: FC<Props> = ({ socmed }) => {
  const { data, setData, post } = useForm({
    github: socmed?.github ?? '',
    linkedin: socmed?.linkedin ?? '',
    youtube: socmed?.youtube ?? '',
    instagram: socmed?.instagram ?? '',
  });

  const handleSubmit = () => {
    post(route('socmed.store'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Berhasil menyimpan data social media'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <SettingsLayout breadcrumbs={breadcrumbs} title="Social media" description="input social media">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl label="Github">
          <Input type="url" placeholder="Github url" value={data.github} onChange={(e) => setData('github', e.target.value)} />
        </FormControl>
        <FormControl label="Linkedin">
          <Input type="url" placeholder="Linkedin url" value={data.linkedin} onChange={(e) => setData('linkedin', e.target.value)} />
        </FormControl>
        <FormControl label="Youtube">
          <Input type="url" placeholder="Youtube url" value={data.youtube} onChange={(e) => setData('youtube', e.target.value)} />
        </FormControl>
        <FormControl label="Instagram">
          <Input type="url" placeholder="Instagram url" value={data.instagram} onChange={(e) => setData('instagram', e.target.value)} />
        </FormControl>

        <Button onClick={handleSubmit}>Simpan</Button>
      </form>
    </SettingsLayout>
  );
};

export default SocialMedia;
