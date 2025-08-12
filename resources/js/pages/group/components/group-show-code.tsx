import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { copyToClipboard } from '@/lib/utils';
import { Copy, X } from 'lucide-react';
import { FC } from 'react';
import QRCode from 'react-qr-code';

type Props = {
  code: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const GroupShowCode: FC<Props> = ({ code, open, onOpenChange }) => {
  const url = route('group.join-by-url', code);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Group code</DialogTitle>
          <DialogDescription>Tulis kode atau scan untuk join group</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="code">Code Group</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          <Card>
            <CardContent className="flex h-64 flex-col items-center justify-center">
              <div>
                <TabsContent value="code" className="itemcenter flex flex-1 justify-center">
                  <h1 className="text-center text-5xl font-bold">{code}</h1>
                </TabsContent>
                <TabsContent value="qr" className="flex-1">
                  <QRCode bgColor="transparent" fgColor="var(--color-foreground)" title={code} size={256} value={url} />
                </TabsContent>
              </div>
            </CardContent>
          </Card>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>
              <X />
              Close
            </Button>
          </DialogClose>
          <div className="flex-1" />
          <Button onClick={() => copyToClipboard(url, 'Link join berhasil di copy ke clipboard')}>
            <Copy />
            Copy join link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupShowCode;
