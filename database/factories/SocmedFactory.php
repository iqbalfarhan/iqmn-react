<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Socmed>
 */
class SocmedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::get()->random();

        return [
            'user_id' => $user->id,
            'github' => "https://github.com/".Str::slug($user->name, "_"),
            'linkedin' => "https://linkedin.com/".Str::slug($user->name, "_"),
            'youtube' => "https://youtube.com/@".Str::slug($user->name, "_"),
            'instagram' => "https://instagram.com/@".Str::slug($user->name, "_"),
        ];
    }
}
