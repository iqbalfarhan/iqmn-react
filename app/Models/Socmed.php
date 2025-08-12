<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socmed extends Model
{
    /** @use HasFactory<\Database\Factories\SocmedFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'github',
        'linkedin',
        'youtube',
        'instagram',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
