import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/types';
import { Link } from '@inertiajs/react';
import { Crown } from 'lucide-react';
import { FC } from 'react';

type Props = {
  group: Group;
};

const GroupItemCard: FC<Props> = ({ group }) => {
  const counts = group.counts ?? {};
  return (
    <Link href={route('group.show', group.id)}>
      <Card className="shadow-2xl shadow-yellow-400">
        <CardContent>
          <div className="flex flex-row justify-between">
            <Button size={'icon'}>{group.name[0]}</Button>
            {group.isPremium && <Crown className="size-4 fill-yellow-500 stroke-yellow-500" />}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-1">{group.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {Object.entries(counts)
              .map(([k, v]) => `${v} ${k}`)
              .join(', ')}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default GroupItemCard;
