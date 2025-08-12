import InputIcon from '@/components/input-icon';
import NoContent from '@/components/no-content';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { Group } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Bookmark, Crown, Search } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import GroupItemCard from '../group/components/group-item-card';

type Props = {
  groups: Group[];
  query: { [key: string]: string };
};

const ExploreGroup: FC<Props> = ({ groups, query }) => {
  const { data, setData } = useForm({
    name: query?.name ?? '',
    premium: query?.premium ?? 'all',
  });

  return (
    <AppLayout
      title="Explore group"
      breadcrumbs={[
        {
          title: 'Dashboard',
          href: route('dashboard'),
        },
        {
          title: 'Explore group',
          href: route('dashboard.explore'),
        },
      ]}
    >
      <form
        className="flex flex-col items-start justify-start gap-2 md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          router.get(route('dashboard.explore'), data, {
            preserveScroll: true,
            onError: (e) => toast.error(em(e)),
          });
        }}
      >
        <InputIcon placeholder="Cari dengan nama, tag, atau kode group" value={data.name} onChange={(e) => setData('name', e.target.value)} />
        <Select value={data.premium} onValueChange={(value) => setData('premium', value)}>
          <SelectTrigger className="w-full md:w-sm">
            <SelectValue placeholder="premium" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua jenis</SelectItem>
            <SelectItem value="free">
              <Bookmark className="fill-blue-500 stroke-blue-500" />
              Kelas gratis
            </SelectItem>
            <SelectItem value="premium">
              <Crown className="fill-yellow-500 stroke-yellow-500" />
              Kelas premium
            </SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">
          <Search />
          Cari kelas
        </Button>
      </form>

      {groups.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups.map((group) => (
              <GroupItemCard group={group} key={group.id} />
            ))}
          </div>
        </>
      ) : (
        <NoContent />
      )}
    </AppLayout>
  );
};

export default ExploreGroup;
