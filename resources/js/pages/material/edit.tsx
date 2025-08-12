import ArticleReader from '@/components/article-reader';
import MediaLibraryDialog from '@/components/media-library-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { em, strLimit } from '@/lib/utils';
import { Material } from '@/types';
import { useForm } from '@inertiajs/react';
import { BookOpen, Check, Edit, Image } from 'lucide-react';
import { FC, useState } from 'react';

import { toast } from 'sonner';
import MaterialFormSheet from './components/material-form-sheet';

type Props = {
  material: Material;
};

const EditMaterial: FC<Props> = ({ material }) => {
  const [editMode, setEditMode] = useState(true);

  const { data, setData, put } = useForm({
    description: material.description,
  });

  const handleUpdate = () => {
    put(route('material.update', material.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Material updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout
      title={material.name}
      description={material.slide_url ?? 'Belum ada url'}
      breadcrumbs={[
        {
          title: material.group.code,
          href: route('group.show', material.group.id),
        },
        {
          title: strLimit(material.name, 20),
          href: route('material.show', material.id),
        },
        {
          title: 'Edit',
          href: route('material.edit', material.id),
        },
      ]}
      actions={
        <MaterialFormSheet purpose="edit" material={material} groupId={material.group.id}>
          <Button variant={'secondary'}>
            <Edit />
            Edit metadata
          </Button>
        </MaterialFormSheet>
      }
    >
      <div className="mx-auto w-full max-w-5xl">
        <Card>
          <div className="flex justify-between gap-4">
            <CardFooter>
              <Button onClick={() => setEditMode(true)} variant={editMode ? 'default' : 'ghost'}>
                <Edit />
                tulis konten
              </Button>
              <Button onClick={() => setEditMode(false)} variant={!editMode ? 'default' : 'ghost'}>
                <BookOpen />
                preview
              </Button>
            </CardFooter>
            <CardFooter>
              <MediaLibraryDialog material={material}>
                <Button variant={'ghost'}>
                  <Image />
                  Thumbnail
                </Button>
              </MediaLibraryDialog>
              <Button onClick={handleUpdate}>
                <Check />
                <span>Simpan</span>
              </Button>
            </CardFooter>
          </div>
          <CardContent>
            {editMode ? (
              <Textarea
                placeholder="Detail material tulis dalam markdown"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="min-h-96 leading-7"
              />
            ) : (
              <ArticleReader className={'h-full min-h-96'} content={data.description} />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditMaterial;
