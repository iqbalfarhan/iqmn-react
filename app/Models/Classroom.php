<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Classroom extends Model 
{
    use HasFactory;
    
    

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
}
