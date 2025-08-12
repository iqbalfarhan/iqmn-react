import HeadingSmall from '@/components/heading-small';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import YoutubeEmbdedFrame from '@/components/youtube-embed-frame';
import { dateDFYHIS } from '@/lib/utils';
import { Group, Material } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import GroupLayout from '../layout/group-layout';

type Props = {
  materials: Material[];
};

const GroupVideos: FC<Props> = ({ materials }) => {
  const { group } = usePage<{ group: Group }>().props;

  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Video',
          href: route('group.video', group.id),
        },
      ]}
    >
      <HeadingSmall title="Materi video" description="Untuk yang merasa visual learner" />

      <div className="grid gap-6 md:grid-cols-2">
        {materials.map((m) => (
          <div key={m.id} className="flex">
            <div className="w-1/2">
              <YoutubeEmbdedFrame url={m.video_url} title={m.name} />
            </div>
            <CardHeader className="w-full">
              <CardTitle>{m.name}</CardTitle>
              <CardDescription>{dateDFYHIS(m.created_at)}</CardDescription>
            </CardHeader>
          </div>
        ))}
      </div>
    </GroupLayout>
  );
};

export default GroupVideos;
