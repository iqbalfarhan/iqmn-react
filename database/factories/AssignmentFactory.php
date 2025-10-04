<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Classroom;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentFactory extends Factory
{
    protected $model = Assignment::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'classroom_id' => Classroom::pluck('id')->random(),
            'description' => fake()->paragraph(),
            'visible' => fake()->boolean(),
        ];
    }
}
