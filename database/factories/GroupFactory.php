<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::get()->random();
        $user->assignRole('pengajar');
        
        return [
            'user_id' => $user->id,
            'name' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'code' => Str::upper(Str::random(6)),
            'price' => fake()->randomElement([0, 10000, 20000, 30000]),
        ];
    }
}
