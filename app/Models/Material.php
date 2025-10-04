<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Material extends Model implements HasMedia
{
    use HasFactory;
    
    use InteractsWithMedia;


    //protected $table = 'materials';

    protected $fillable = [
        'name',
        'description',
        'url',
        'classroom_id',
        'visible'
    ];

    // protected $guarded = [
    //     'id',
    //     'created_at',
    //     'updated_at',
    // ];

    /**
     * Register media conversions.
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
