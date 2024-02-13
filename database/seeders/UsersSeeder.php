<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\RoleUser;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $roles = [1 => 'administrador', 2 => 'editor', 3 => 'invitado'];

        // Crear 10 usuarios
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => "Usuario{$i}",
                'email' => "usuario{$i}@example.com",
                'password' => '$2y$12$zlxvm7Kfx0FDMe/1gQa5N.o/4mVAH3AUTtxeSIBz9HgIWlIuAw89i', // Contraseña genérica para propósitos de demostración
            ]);
            //password Abc*1234

            // Asignar roles: 1-2 administradores, 3-5 editores, 6-10 invitados
            $roleId = $i <= 2 ? 1 : ($i <= 5 ? 2 : 3);
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => $roleId,
            ]);
        }
    }
}