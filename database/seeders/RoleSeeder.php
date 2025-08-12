<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'superadmin', 'guard_name' => 'web'],
            ['name' => 'pengajar', 'guard_name' => 'web'],
            ['name' => 'pelajar', 'guard_name' => 'web'],
        ];

        Role::insert($roles);

        $permissions = [
            [
                "name" => "create group",
                "roles" => ["pengajar"]
            ],
            [
                "name" => "edit group",
                "roles" => ["pengajar"]
            ],
            [
                "name" => "hapus group",
                "roles" => ["pengajar"]
            ],
            [
                "name" => "input nilai",
                "roles" => ["pengajar"]
            ],
            [
                "name" => "upload jawaban",
                "roles" => ["pelajar", "pengajar"]
            ],
            [
                "name" => "approve pembayaran",
                "roles" => ["pengajar"]
            ],
        ];

        foreach ($permissions as $permit) {
            $p = Permission::create([
                'name' => $permit['name'],
                'guard_name' => 'web'
            ]);

            $p->syncRoles($permit['roles']);
        }
    }
}
