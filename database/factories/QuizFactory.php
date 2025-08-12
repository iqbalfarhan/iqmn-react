<?php

namespace Database\Factories;

use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'material_id' => Material::pluck('id')->random(),
            'question' => fake()->sentence(),
            'a' => fake()->sentence(),
            'b' => fake()->sentence(),
            'c' => fake()->sentence(),
            'answer' => fake()->randomElement(["a","b","c"]),
        ];
    }
}
