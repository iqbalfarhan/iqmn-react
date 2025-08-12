<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'group_id' => Group::pluck('id')->random(),
            'name' => fake()->sentence(),
            'description' => fake()->text(),
            'slide_url' => fake()->url(),
            'video_url' => null,
        ];
    }
}
