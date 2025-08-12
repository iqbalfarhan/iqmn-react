<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Material extends Model
{
    /** @use HasFactory<\Database\Factories\MaterialFactory> */
    use HasFactory;

    protected $fillable = [
        'group_id',
        'name',
        'description',
        'slide_url',
        'video_url',
        'photo',
        'publish',
    ];

    public $appends = [
        'thumbnail',
    ];

    public $casts = [
        'publish' => 'boolean'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function scopePublished($query)
    {
        return $query->where('publish', true);
    }

    public function getThumbnailAttribute()
    {
        return $this->photo ? Storage::url($this->photo) : asset('defaultCover.png');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
