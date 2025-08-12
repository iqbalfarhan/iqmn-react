<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Nilai extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\NilaiFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'tugas_id',
        'user_id',
        'jawaban',
        'nilai',
    ];

    public function tugas()
    {
        return $this->belongsTo(Tugas::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
