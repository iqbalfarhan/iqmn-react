<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
    protected $model = Classroom::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'code' => fake()->numerify('######'),
            'user_id' => User::pluck('id')->random(),
            'description' => fake()->paragraph(),
            'visibility' => fake()->randomElement(Classroom::$enumVisibility),
        ];
    }
}
