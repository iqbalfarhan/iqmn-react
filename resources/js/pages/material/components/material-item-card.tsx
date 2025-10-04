import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/types/material';
import { FC } from 'react';

type Props = {
  material: Material;
  className?: string;
};

const MaterialItemCard: FC<Props> = ({ material, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="h-full">
        <CardTitle className="leading-normal">{material.name}</CardTitle>
        <CardDescription className="line-clamp-1">{material.url}</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="h-36 w-full rounded-lg">
          <AvatarImage src={material.media[0]?.preview_url} className="aspect-video w-full object-cover" />
        </Avatar>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary">{material.visible ? 'Visible' : 'Hidden'}</Badge>
      </CardFooter>
    </Card>
  );
};

export default MaterialItemCard;
