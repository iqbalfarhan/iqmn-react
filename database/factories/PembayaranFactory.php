<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pembayaran>
 */
class PembayaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $group = Group::premium()->get()->random();

        return [
            'user_id' => User::pluck('id')->random(),
            'group_id' => $group->id,
            'amount' => $group->price,
            'description' => "Pembayaran untuk group {$group->name}",
            'paid' => fake()->boolean()
        ];
    }
}
