import ArticleReader from '@/components/article-reader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import YoutubeEmbdedFrame from '@/components/youtube-embed-frame';
import AppLayout from '@/layouts/app-layout';
import { cn, em, strLimit } from '@/lib/utils';
import { Material } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, ExternalLink, MessageCircle, Pencil } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import MaterialChatSheet from './components/material-chat-sheet';
import MaterialFormSheet from './components/material-form-sheet';

type Props = {
  material: Material;
  canEditGroup: boolean;
};

const MaterialDetail: FC<Props> = ({ material, canEditGroup }) => {
  return (
    <AppLayout
      title={'Detail material'}
      description={`Group ${material?.group?.name}`}
      breadcrumbs={[
        {
          title: material.group.code,
          href: route('group.show', material.group.id),
        },
        {
          title: strLimit(material.name, 20),
          href: route('material.show', material.id),
        },
      ]}
      actions={
        <>
          {canEditGroup && (
            <>
              <Button asChild>
                <Link href={route('material.edit', material.id)}>
                  <Edit />
                  Edit konten
                </Link>
              </Button>
              <MaterialFormSheet purpose="edit" material={material} groupId={material.group.id}>
                <Button>
                  <Edit />
                  Edit metadata
                </Button>
              </MaterialFormSheet>
            </>
          )}
        </>
      }
    >
      <div className="mx-auto flex flex-col gap-6 md:flex-row">
        <div className="w-full max-w-3xl space-y-10">
          <h1 className="text-4xl font-bold">{material.name}</h1>
          {material.thumbnail && <img src={material.thumbnail} className={cn('w-full rounded-lg', !material.publish && 'grayscale filter')} />}
          <ArticleReader content={material.description} />
        </div>

        <div className="w-96 space-y-4">
          {canEditGroup && (
            <Card>
              <CardHeader>
                <CardTitle>Publish materi ini</CardTitle>
                <CardDescription className={cn(material.publish ? 'text-green-500' : 'text-destructive')}>
                  Materi ini {material.publish ? '' : 'tidak'} ditampilkan ke anggota group.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    defaultChecked={material.publish}
                    onCheckedChange={(c: boolean) =>
                      router.put(
                        route('material.update', material.id),
                        { publish: c },
                        {
                          preserveScroll: true,
                          onSuccess: () => toast.success('Visibility material berhasil diubah'),
                          onError: (e) => toast.error(em(e)),
                        },
                      )
                    }
                  />
                  <span>Publish</span>
                </Label>
              </CardFooter>
            </Card>
          )}
          {material.slide_url && (
            <Card>
              <CardHeader>
                <CardTitle>Link google slide</CardTitle>
                <CardDescription>Buka slide material</CardDescription>
              </CardHeader>
              <CardFooter>
                {material.slide_url?.toString() !== '' && (
                  <Button asChild>
                    <a href={material.slide_url}>
                      <ExternalLink />
                      Buka slide materi
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Kerjakan Quiz</CardTitle>
              <CardDescription>Takar pemahaman anda tentang materi ini</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={route('material.quizzes', material.id)}>
                  <Pencil />
                  Kerjakan quiz
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>Diskusi tentang materi ini</CardDescription>
            </CardHeader>
            <CardFooter>
              <MaterialChatSheet materialId={material.id}>
                <Button>
                  <MessageCircle />
                  Tampilkan panel diskusi
                </Button>
              </MaterialChatSheet>
            </CardFooter>
          </Card>
          {material.video_url && (
            <Card className="sticky top-0">
              <CardHeader>
                <CardTitle>Materi versi video</CardTitle>
                <CardDescription>Untuk kamu yang visual learner</CardDescription>
              </CardHeader>
              <CardContent>
                <YoutubeEmbdedFrame url={material.video_url ?? ''} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MaterialDetail;
