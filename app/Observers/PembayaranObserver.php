<?php

namespace App\Observers;

use App\Models\Notifikasi;
use App\Models\Pembayaran;
use App\Notifications\InvoicePaid;
use App\Notifications\JoinPremiumGroup;

class PembayaranObserver
{
    /**
     * Handle the Pembayaran "created" event.
     */
    public function created(Pembayaran $pembayaran): void
    {
        Notifikasi::create([
            'user_id' => $pembayaran->user_id,
            'title' => 'Join group',
            'link' => route('pembayaran.show', $pembayaran->id),
            "content" => "Pembayaran untuk join group {$pembayaran->group->name} telah dibuat"
        ]);

        $user = $pembayaran->user;
        $user->notify(new JoinPremiumGroup($pembayaran));

        Notifikasi::create([
            'user_id' => $pembayaran->group->user_id,
            'title' => "Join group",
            'link' => route('pembayaran.show', $pembayaran->id),
            "content" => "{$pembayaran->user->name} telah membuat pembayaran untuk group {$pembayaran->group->name}"
        ]);

    }

    /**
     * Handle the Pembayaran "updated" event.
     */
    public function updated(Pembayaran $pembayaran): void
    {
        //
    }

    /**
     * Handle the Pembayaran "deleted" event.
     */
    public function deleted(Pembayaran $pembayaran): void
    {
        //
    }

    /**
     * Handle the Pembayaran "restored" event.
     */
    public function restored(Pembayaran $pembayaran): void
    {
        //
    }

    /**
     * Handle the Pembayaran "force deleted" event.
     */
    public function forceDeleted(Pembayaran $pembayaran): void
    {
        //
    }
}
