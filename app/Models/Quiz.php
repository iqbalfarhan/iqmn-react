<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    protected $fillable = [
        'material_id',
        'question',
        'attachment',
        'a',
        'b',
        'c',
        'answer',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
