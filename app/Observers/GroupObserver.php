<?php

namespace App\Observers;

use App\Models\Group;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Support\Str;

class GroupObserver
{
    /**
     * Handle the Group "created" event.
     */
    public function created(Group $group): void
    {
        if ($group->code === null) {
            $group->code = Str::upper(Str::random(6));
            $group->saveQuietly();
        }
    }

    /**
     * Handle the Group "updated" event.
     */
    public function updated(Group $group): void
    {
        //
    }

    /**
     * Handle the Group "deleted" event.
     */
    public function deleted(Group $group): void
    {
        //
    }

    /**
     * Handle the Group "restored" event.
     */
    public function restored(Group $group): void
    {
        //
    }

    /**
     * Handle the Group "force deleted" event.
     */
    public function forceDeleted(Group $group): void
    {
        //
    }
}
