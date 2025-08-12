import { em, handlePasteScreenshot } from '@/lib/utils';
import { Material } from '@/types';
import { router } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';
import FormControl from './form-control';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

type Props = PropsWithChildren & {
  material: Material;
};

const MediaLibraryDialog: FC<Props> = ({ children, material }) => {
  const [photo, setPhoto] = useState<File | undefined>(undefined);

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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thumbnail material</DialogTitle>
          <DialogDescription>Paste file gambar di sini untuk upload data</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FormControl label="Upload thumbnail">
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                placeholder="Material URL"
                onChange={(e) => {
                  setPhoto(e.target.files?.[0]);
                  handleUploadThumbnail(e.target.files?.[0]);
                }}
              />
            </div>
            <img src={photo ? URL.createObjectURL(photo) : material.thumbnail} className="aspect-video rounded object-cover" />
          </FormControl>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLibraryDialog;
