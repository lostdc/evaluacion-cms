<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear el rol de administrador
        Role::create([
            'name' => 'administrador',
        ]);

        // Crear el rol de editor
        Role::create([
            'name' => 'editor',
        ]);

        // Crear el rol de invitado
        Role::create([
            'name' => 'invitado',
        ]);
    }
}
