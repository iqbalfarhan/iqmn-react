<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Nilai;
use App\Models\Tugas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TugasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tugas::factory(10)->create()->each(function ($tugas) {
            $group = Group::find($tugas->group_id);
            $members = $group->members->pluck('id')->toArray();

            foreach ($members as $user_id) {
                Nilai::factory()->create([
                    'tugas_id' => $tugas->id,
                    'user_id' => $user_id
                ]);
            }
        });
    }
}
