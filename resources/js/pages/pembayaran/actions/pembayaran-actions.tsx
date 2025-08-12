import { em } from '@/lib/utils';
import { Pembayaran } from '@/types';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export const handleApprovePembayaran = (pembayaran: Pembayaran) => {
  router.put(
    route('pembayaran.approve', pembayaran.id),
    {},
    {
      preserveScroll: true,
      onSuccess: () => toast.success('Pembayaran approved successfully'),
      onError: (e) => toast.error(em(e)),
    },
  );
};

export const handleUndoApprovePembayaran = (pembayaran: Pembayaran) => {
  router.put(
    route('pembayaran.update', pembayaran.id),
    {
      paid: false,
    },
    {
      preserveScroll: true,
      onSuccess: () => toast.success('Status pembayaran berhasil dikembalikan'),
      onError: (e) => toast.error(em(e)),
    },
  );
};
