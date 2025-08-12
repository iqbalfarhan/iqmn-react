<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Material::factory()->count(10)->create()->each(function($m){
            $material_id = $m->id;

            Quiz::factory(6)->create([
                "material_id" => $material_id
            ]);

        });
    }
}
