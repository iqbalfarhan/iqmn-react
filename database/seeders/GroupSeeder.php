<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Group;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Group::factory(1)->create()->each(function ($group){
            User::factory(3)->create()->each(function ($user) use ($group){
                $group->members()->attach($user->id);
                $user->assignRole('pelajar');
            });

            Material::factory(4)->create([
                "group_id" => $group->id,
            ])->each(function($m){
                $m->update([
                    "publish" => fake()->boolean(20)
                ]);

                Chat::factory(3)->create([
                    'material_id' => $m->id
                ]);
            });
        });
    }
}