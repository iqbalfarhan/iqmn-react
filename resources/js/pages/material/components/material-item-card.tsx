import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn, em } from '@/lib/utils';
import { Material } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import MaterialDeleteDialog from './material-delete-dialog';
import MaterialFormSheet from './material-form-sheet';

type Props = {
  material: Material;
};

const MaterialItemCard: FC<Props> = ({ material }) => {
  const { canEditGroup } = usePage<{ canEditGroup: boolean }>().props ?? false;

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link href={route('material.show', material.id)}>
            <Card>
              <CardContent className="flex gap-3">
                {!material.publish && (
                  <div className="absolute z-10 rounded-br-xl bg-card pt-0 pr-2 pb-2 pl-0">
                    <Badge variant={'default'}>Draft</Badge>
                  </div>
                )}
                <img
                  src={material.thumbnail}
                  className={cn('aspect-video w-full rounded-md object-cover opacity-100', !material.publish ? 'opacity-40 grayscale filter' : '')}
                />
              </CardContent>
              <CardHeader className={cn('opacity-100', !material.publish ? 'opacity-50' : '')}>
                <CardTitle className="line-clamp-1">{material.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  Material ini diupload pada {dayjs(material.created_at).format('dddd, DD MMMM YYYY HH:mm')}.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </ContextMenuTrigger>
        {canEditGroup && (
          <ContextMenuContent>
            <ContextMenuItem inset asChild>
              <Link href={route('material.show', material.id)}>Visit material</Link>
            </ContextMenuItem>
            <ContextMenuItem inset onSelect={() => setOpen(true)}>
              Edit information
            </ContextMenuItem>
            <ContextMenuItem inset asChild>
              <Link href={route('material.edit', material.id)}>Edit content</Link>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              onCheckedChange={() => {
                router.put(
                  route('material.update', material.id),
                  { publish: true },
                  {
                    preserveScroll: true,
                    onSuccess: () => toast.success('Visibility material berhasil diubah'),
                    onError: (e) => toast.error(em(e)),
                  },
                );
              }}
              checked={material.publish}
            >
              Set as publish
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              onCheckedChange={() => {
                router.put(
                  route('material.update', material.id),
                  { publish: false },
                  {
                    preserveScroll: true,
                    onSuccess: () => toast.success('Visibility material berhasil diubah'),
                    onError: (e) => toast.error(em(e)),
                  },
                );
              }}
              checked={!material.publish}
            >
              Set as not publish
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset variant="destructive" onSelect={() => setOpenDeleteDialog(true)}>
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
      <MaterialFormSheet material={material} purpose="edit" groupId={material.group.id} open={open} onOpenChange={setOpen} />
      <MaterialDeleteDialog material={material} open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} />
    </>
  );
};

export default MaterialItemCard;
