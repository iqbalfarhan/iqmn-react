import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS, em, formatRupiah, paymentCode } from '@/lib/utils';
import { BreadcrumbItem, Pembayaran } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Check, CheckCheck, ExternalLink, Undo2, Upload, X } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import { handleApprovePembayaran, handleUndoApprovePembayaran } from './actions/pembayaran-actions';

type Props = {
  pembayaran: Pembayaran;
  canApprovePembayaran: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('dashboard') },
  { title: 'Pembayaran', href: route('pembayaran.index') },
];

const DetailPembayaran: FC<Props> = ({ pembayaran, canApprovePembayaran }) => {
  const group = pembayaran?.group;

  const [buktiBayar, setBuktiBayar] = useState<File | undefined>(undefined);

  const handleUploadBuktiBayar = (file: File | undefined) => {
    router.post(
      route('pembayaran.upload-bukti', pembayaran.id),
      {
        bukti: file,
      },
      {
        preserveScroll: true,
        onSuccess: () => toast.success('berhasil upload file'),
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  return (
    <AppLayout
      title={`Pembayaran ${paymentCode(pembayaran.id)}`}
      description={`Status pembayaran saat ini : ${pembayaran.paid ? 'Sudah lunas' : 'Belum dibayar'}`}
      breadcrumbs={[
        ...breadcrumbs,
        {
          title: paymentCode(pembayaran.id),
          href: route('pembayaran.show', pembayaran.id),
        },
      ]}
      actions={
        <>
          {canApprovePembayaran && (
            <>
              {pembayaran.paid ? (
                <Button variant={'secondary'} onClick={() => handleUndoApprovePembayaran(pembayaran)}>
                  <Undo2 /> Undo approve pembayaran
                </Button>
              ) : (
                <Button onClick={() => handleApprovePembayaran(pembayaran)}>
                  <CheckCheck /> Approve pembayaran
                </Button>
              )}
            </>
          )}
        </>
      }
    >
      <Card className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Invoice</CardTitle>
            <CardDescription>Informasi pembayaran</CardDescription>
          </CardHeader>
          <CardFooter>
            {pembayaran.paid ? (
              <Button disabled>
                <Check />
                Sudah dibayar
              </Button>
            ) : (
              <Button disabled variant={'destructive'}>
                <X />
                Belum bayar
              </Button>
            )}
          </CardFooter>
        </div>
        <Separator />
        <CardContent className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <h4>Kepada:</h4>
              <p className="text-sm text-muted-foreground">Iqbal farhan syuhada</p>
              <p className="text-sm text-muted-foreground">Dana : 08999779527</p>
            </div>
            <div>
              <h4>Tanggal:</h4>
              <p className="text-sm text-muted-foreground">{dateDFYHIS(pembayaran.created_at)}</p>
            </div>
            <div>
              <h4>Nomor invoice:</h4>
              <p className="text-sm text-muted-foreground">{paymentCode(pembayaran.id)}</p>
            </div>
          </div>

          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Group name</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{pembayaran.description}</TableCell>
                <TableCell>{group?.name}</TableCell>
                <TableCell className="text-right font-mono">{formatRupiah(pembayaran.amount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pajak</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">{formatRupiah(0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Biaya administrasi</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">{formatRupiah(0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="grid gap-6 lg:grid-cols-3">
            {pembayaran.paid ? (
              <img src={pembayaran.thumbnail} alt="" />
            ) : (
              <FormControl>
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setBuktiBayar(e.target.files?.[0]);
                    handleUploadBuktiBayar(e.target.files?.[0]);
                  }}
                  accept="image/*"
                />
                {buktiBayar ? (
                  <div>
                    <img src={URL.createObjectURL(buktiBayar)} alt="" />
                  </div>
                ) : pembayaran.thumbnail ? (
                  <img src={pembayaran.thumbnail} alt="" />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 space-x-2 rounded-xl border-2 border-dashed border-muted p-4 py-10 text-muted-foreground opacity-70 hover:opacity-100">
                    <Upload />
                    <span>Upload bukti pembayaran</span>
                  </div>
                )}
              </FormControl>
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="justify-between">
          <div className="justify-end space-x-2">
            {group && (
              <Button asChild>
                <Link href={route('group.show', group?.id)}>
                  <ExternalLink /> Lihat detail group
                </Link>
              </Button>
            )}
          </div>
          <div className="text-right">
            <h4 className="text-sm text-muted-foreground">Total pembayaran:</h4>
            <h3 className="font-mono text-xl font-bold">{formatRupiah(pembayaran.amount)}</h3>
          </div>
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default DetailPembayaran;
