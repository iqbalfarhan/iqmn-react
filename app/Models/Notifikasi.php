<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    /** @use HasFactory<\Database\Factories\NotifikasiFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'link',
        'read',
    ];

    protected $casts = [
        'read' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
