import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { em, handlePasteScreenshot } from '@/lib/utils';
import { FormPurpose, Group, Material } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  material?: Material;
  purpose: FormPurpose;
  groupId: Group['id'];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const MaterialFormSheet: FC<Props> = ({ children, material, purpose, groupId, open, onOpenChange }) => {
  const [photo, setPhoto] = useState<File | undefined>(undefined);

  const { data, setData, put, post } = useForm({
    group_id: groupId,
    name: material?.name ?? '',
    description: material?.description ?? '',
    slide_url: material?.slide_url ?? '',
    video_url: material?.video_url ?? '',
    publish: material?.publish as boolean,
    photo: undefined as File | undefined,
  });

  const isMobile = useIsMobile();

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('material.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material created successfully');
          setData('name', '');
          onOpenChange?.(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('material.update', material?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Material updated successfully');
          onOpenChange?.(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  const handleUploadThumbnail = (photo: File | undefined) => {
    router.post(
      route('material.upload-thumbnail', material?.id),
      {
        file: photo,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('berhasil upload file');
          setPhoto(undefined);
        },
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  useEffect(() => {
    const cleanup = handlePasteScreenshot((file) => {
      router.post(
        route('material.upload-thumbnail', material?.id),
        {
          file,
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success('berhasil upload file');
            setPhoto(undefined);
          },
          onError: (e) => toast.error(em(e)),
        },
      );
    });

    return cleanup;
  }, [material?.id]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent side={isMobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>{purpose} data material</SheetTitle>
          <SheetDescription>
            Form untuk {purpose} data material {groupId}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <form
            className="space-y-4 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Judul materi belajar">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>

            {material && (
              <>
                <FormControl label="Link google slide">
                  <Input type="url" placeholder="URL material" value={data.slide_url} onChange={(e) => setData('slide_url', e.target.value)} />
                </FormControl>
                <FormControl label="Link Video youtube">
                  <Input type="url" placeholder="URL material" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} />
                </FormControl>
                <FormControl label="Upload thumbnail">
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Material URL"
                      className="hidden"
                      onChange={(e) => {
                        setPhoto(e.target.files?.[0]);
                        handleUploadThumbnail(e.target.files?.[0]);
                      }}
                    />
                  </div>
                  <img src={photo ? URL.createObjectURL(photo) : material.thumbnail} className="aspect-video w-full rounded object-cover" />
                </FormControl>
                {/*<FormControl label="Tampilkan materi ini">
                  <div className="flex h-9 cursor-pointer items-center gap-2">
                    <Checkbox checked={data.publish} onCheckedChange={(c: boolean) => setData('publish', c)} />
                    <span>Publish</span>
                  </div>
                </FormControl>*/}
              </>
            )}
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan perubahan
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MaterialFormSheet;
