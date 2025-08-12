import { Material } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import MaterialItemCard from '../components/material-item-card';

type Props = {
  materials: Material[];
};

const MaterialGridView: FC<Props> = ({ materials }) => {
  const { canEditGroup } = usePage<{ canEditGroup: boolean }>().props ?? false;
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {materials
        .filter((m) => canEditGroup || m.publish)
        .map((material) => (
          <MaterialItemCard material={material} key={material.id} />
        ))}
    </div>
  );
};

export default MaterialGridView;
