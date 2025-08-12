import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Group, Material } from '@/types';
import { usePage } from '@inertiajs/react';
import { Grid2X2, List, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import MaterialFormSheet from '../../material/components/material-form-sheet';
import MaterialGridView from '../../material/views/material-grid-view';
import MaterialTableView from '../../material/views/material-table-view';
import GroupLayout from '../layout/group-layout';

type Props = {
  group: Group;
  materials: Material[];
};

const MaterialGroup: FC<Props> = ({ group, materials }) => {
  const { canEditGroup } = usePage<{ canEditGroup: boolean }>().props;
  const [mode, setMode] = useState<'grid' | 'table'>('grid');
  return (
    <GroupLayout
      breadcrumbs={[
        {
          title: 'Material',
          href: route('group.show', group.id),
        },
      ]}
    >
      <HeadingSmall
        title="Materi belajar"
        description="List materi yang ada di grup ini"
        actions={
          <>
            <div className="flex">
              <Button size={'icon'} variant={mode == 'grid' ? 'default' : 'ghost'} onClick={() => setMode('grid')}>
                <Grid2X2 />
              </Button>
              <Button size={'icon'} variant={mode == 'table' ? 'default' : 'ghost'} onClick={() => setMode('table')}>
                <List />
              </Button>
            </div>
            {canEditGroup && (
              <MaterialFormSheet purpose="create" groupId={group.id}>
                <Button>
                  <Plus />
                  Buat material baru
                </Button>
              </MaterialFormSheet>
            )}
          </>
        }
      />

      {mode == 'grid' && <MaterialGridView materials={materials} />}
      {mode == 'table' && <MaterialTableView materials={materials} canEditGroup={canEditGroup} />}
    </GroupLayout>
  );
};

export default MaterialGroup;
