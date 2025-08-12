<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Iqbal Farhan Syuhada',
            'email' => 'iqbalfarhan1996@gmail.com',
            'password' => 'password',
        ])->each(function ($user) {
            $user->assignRole('superadmin');
        });
        
        // User::factory(10)->create()->each(function ($user) {
        //     $user->assignRole('pelajar');
        // });
    }
}
