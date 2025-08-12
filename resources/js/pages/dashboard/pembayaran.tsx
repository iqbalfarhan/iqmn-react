import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, paymentCode } from '@/lib/utils';
import { BreadcrumbItem, Pembayaran } from '@/types';
import { Link } from '@inertiajs/react';
import { CheckCheck, Edit, Filter, Info, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import { handleApprovePembayaran, handleUndoApprovePembayaran } from '../pembayaran/actions/pembayaran-actions';
import PembayaranFilterSheet from '../pembayaran/components/pembayaran-filter-sheet';
import PembayaranInfoSheet from '../pembayaran/components/pembayaran-info-sheet';

type Props = {
  pembayarans: Pembayaran[];
  canApprove: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Pembayaran',
    href: route('pembayaran.index'),
  },
];

const PembayaranList: FC<Props> = ({ pembayarans, canApprove }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');
  const [status, setStatus] = useState('all');

  return (
    <AppLayout title="Premium group join payment" description="Manage your pembayarans" breadcrumbs={breadcrumbs} actions={<PembayaranInfoSheet />}>
      <div className="flex gap-2">
        <Input placeholder="Search pembayarans..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <Select defaultValue={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full md:w-sm">
            <SelectValue placeholder={'Status pembayaran'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
        <PembayaranFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </PembayaranFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <Button>
              <Edit /> Edit selected
            </Button>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === pembayarans.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(pembayarans.map((pembayaran) => pembayaran.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Payment code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Bukti bayar</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pembayarans
            .filter((pembayaran) => JSON.stringify(pembayaran).toLowerCase().includes(cari.toLowerCase()))
            .filter((pembayaran) => status === 'all' || (status === 'paid' && pembayaran.paid) || (status === 'unpaid' && !pembayaran.paid))
            .map((pembayaran) => (
              <TableRow key={pembayaran.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(pembayaran.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, pembayaran.id]);
                          } else {
                            setIds(ids.filter((id) => id !== pembayaran.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell className="font-mono">
                  <Link href={route('pembayaran.show', pembayaran.id)}>
                    <Badge variant={'outline'}>{paymentCode(pembayaran.id)}</Badge>
                  </Link>
                </TableCell>
                <TableCell>{pembayaran.description}</TableCell>
                <TableCell>{formatRupiah(pembayaran.amount)}</TableCell>
                <TableCell>{pembayaran.paid ? <Badge>paid</Badge> : <Badge variant={'secondary'}>unpaid</Badge>}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarFallback />
                    <AvatarImage src={pembayaran.thumbnail} />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'} asChild>
                    <Link href={route('pembayaran.show', pembayaran.id)}>
                      <Info />
                      Detail
                    </Link>
                  </Button>
                  {canApprove && (
                    <>
                      <Button variant={'ghost'} size={'icon'} onClick={() => handleApprovePembayaran(pembayaran)} disabled={pembayaran.paid}>
                        <CheckCheck />
                      </Button>
                      <Button variant={'ghost'} size={'icon'} onClick={() => handleUndoApprovePembayaran(pembayaran)} disabled={!pembayaran.paid}>
                        <Undo2 />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PembayaranList;
