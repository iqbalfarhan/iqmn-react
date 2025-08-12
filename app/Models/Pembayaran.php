<?php

namespace App\Models;

use App\Observers\PembayaranObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[ObservedBy(PembayaranObserver::class)]
class Pembayaran extends Model
{
    /** @use HasFactory<\Database\Factories\PembayaranFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group_id',
        'amount',
        'description',
        'bukti_bayar',
        'paid',
    ];

    public $casts = [
        'paid' => 'boolean',
    ];

    public $appends = [
        'thumbnail',
        'code',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getThumbnailAttribute()
    {
        return $this->bukti_bayar ? Storage::url($this->bukti_bayar) : "";
    }

    public function getCodeAttribute()
    {
        return '#' . str_pad((string) $this->id, 6, '0', STR_PAD_LEFT);
    }
}
