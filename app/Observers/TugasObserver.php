<?php

namespace App\Observers;

use App\Models\Notifikasi;
use App\Models\Tugas;

class TugasObserver
{
    /**
     * Handle the Tugas "created" event.
     */
    public function created(Tugas $tugas): void
    {
        $group = $tugas->group;
        $memberIds = $group->members->pluck('id')->toArray();
        
        foreach ($memberIds as $id) {
            Notifikasi::create([
                'user_id' => $id,
                'title' => "Tugas baru ".$tugas->name,
                'link' => route('dashboard.daftar-tugas'),
                "content" => "Tugas baru telah dibuat di group {$group->name} dengan judul {$tugas->name} dengan bobot {$tugas->rate}"
            ]);
        }
    }

    /**
     * Handle the Tugas "updated" event.
     */
    public function updated(Tugas $tugas): void
    {
        //
    }

    /**
     * Handle the Tugas "deleted" event.
     */
    public function deleted(Tugas $tugas): void
    {
        //
    }

    /**
     * Handle the Tugas "restored" event.
     */
    public function restored(Tugas $tugas): void
    {
        //
    }

    /**
     * Handle the Tugas "force deleted" event.
     */
    public function forceDeleted(Tugas $tugas): void
    {
        //
    }
}
