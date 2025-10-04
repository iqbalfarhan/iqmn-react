<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Classroom extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    
    

    //protected $table = 'classrooms';

    
    protected $fillable = [
        'name',
        'code',
        'user_id',
        'description',
        'visibility'
    ];
    
    public static $enumVisibility = [
        'public',
        'private',
    ];

    // protected $guarded = [
    //     'id',
    //     'created_at',
    //     'updated_at',
    // ];

    public $appends = [
        'cover'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function scopeMine($q)
    {
        return $q->where('user_id', auth()->id());
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'members', 'classroom_id', 'user_id');
    }

    public function getCoverAttribute()
    {
        $firstMedia = $this->getFirstMediaUrl();
        return $firstMedia;
    }
}
