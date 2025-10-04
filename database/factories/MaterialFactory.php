<?php

namespace Database\Factories;

use App\Models\Material;
use App\Models\Classroom;
use Illuminate\Database\Eloquent\Factories\Factory;

class MaterialFactory extends Factory
{
    protected $model = Material::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'url' => fake()->url(),
            'classroom_id' => Classroom::pluck('id')->random(),
            'visible' => fake()->boolean(),
        ];
    }
}
