import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Info, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const PembayaranInfoSheet: FC<Props> = ({ children }) => {
  return (
    <Sheet>
      {children ? (
        <SheetTrigger asChild>{children}</SheetTrigger>
      ) : (
        <SheetTrigger asChild>
          <Button>
            <Info />
            Cara pembayaran
          </Button>
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cara pembayaran</SheetTitle>
          <SheetDescription>Informasi cara pembayaran</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto px-4">
          <article className="prose prose-invert">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo magnam temporibus amet fuga, incidunt tempora deserunt similique, alias
              sapiente dolorem magni id ut molestiae aliquid error earum tenetur libero quidem?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur esse corrupti enim eveniet aliquam quas labore ex molestiae et.
              Voluptatibus perferendis similique praesentium, dolorum consectetur distinctio voluptatum! Nihil, tempore fugit.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi exercitationem consequatur, ipsam ipsa quam ducimus quos,
              cupiditate perspiciatis libero quod assumenda sunt. Ex quia non eveniet illo dolores!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis distinctio id soluta asperiores ad illo dolorum expedita exercitationem
              fugiat eaque! Repellendus excepturi odit vel vitae sapiente saepe mollitia dolore fugiat!
            </p>
          </article>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={'secondary'}>
              <X />
              Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PembayaranInfoSheet;
