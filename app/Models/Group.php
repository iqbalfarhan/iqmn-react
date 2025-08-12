<?php

namespace App\Models;

use App\Observers\GroupObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(GroupObserver::class)]
class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'code',
        'price',
    ];

    public $casts = [
        "price" => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'group_user');
    }

    public function getIsPremiumAttribute(): bool
    {
        return $this->price > 0;
    }

    public function scopePremium($query)
    {
        return $query->where('price', '>', 0);
    }

    public function tugases()
    {
        return $this->hasMany(Tugas::class);
    }
}
