<?php

namespace App\Models;

use App\Observers\TugasObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[ObservedBy(TugasObserver::class)]
class Tugas extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\TugasFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'group_id',
        'name',
        'description',
        'limit_date',
        'rate',
        'available'
    ];

    public $casts = [
        "limit_data" => 'date',
        "available" => 'boolean'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function nilais()
    {
        return $this->hasMany(Nilai::class);
    }
}
