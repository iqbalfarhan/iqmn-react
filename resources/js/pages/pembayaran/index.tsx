import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, paymentCode } from '@/lib/utils';
import { BreadcrumbItem, Pembayaran } from '@/types';
import { Link } from '@inertiajs/react';
import { CheckCheck, Edit, Filter, Folder, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import UserDetailPopover from '../user/components/user-detail-popover';
import { handleApprovePembayaran, handleUndoApprovePembayaran } from './actions/pembayaran-actions';
import PembayaranDeleteDialog from './components/pembayaran-delete-dialog';
import PembayaranFilterSheet from './components/pembayaran-filter-sheet';
import PembayaranFormSheet from './components/pembayaran-form-sheet';
import PembayaranInfoSheet from './components/pembayaran-info-sheet';

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
            <TableHead>Code</TableHead>
            <TableHead>Nama user</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
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
                <TableCell>{pembayaran.user && <UserDetailPopover user={pembayaran.user} />}</TableCell>
                <TableCell>{pembayaran.description}</TableCell>
                <TableCell>{formatRupiah(pembayaran.amount)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>{pembayaran.paid ? <Badge>paid</Badge> : <Badge variant={'secondary'}>unpaid</Badge>}</DropdownMenuTrigger>
                    {canApprove && (
                      <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuItem onClick={() => handleApprovePembayaran(pembayaran)} disabled={pembayaran.paid}>
                          <CheckCheck />
                          Approve pembayaran
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUndoApprovePembayaran(pembayaran)} disabled={!pembayaran.paid}>
                          <Undo2 />
                          Undo approve
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('pembayaran.show', pembayaran.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <PembayaranFormSheet purpose="edit" pembayaran={pembayaran}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </PembayaranFormSheet>
                  <PembayaranDeleteDialog pembayaran={pembayaran}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </PembayaranDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PembayaranList;
