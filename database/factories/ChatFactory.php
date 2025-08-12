<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $group = Group::get()->random();
        // $user_ids = $group->members->pluck('id');
        // $material_ids = $group->members->pluck('id');

        // return [
        //     'user_id' => fake()->randomElement($user_ids),
        //     'material_id' => fake()->randomElement($material_ids),
        //     'message' => fake()->sentence(),
        // ];

        return [
            'user_id' => User::pluck('id')->random(),
            'material_id' => Material::pluck('id')->random(),
            'message' => fake()->sentence(),
        ];
    }
}
