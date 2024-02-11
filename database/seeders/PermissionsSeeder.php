<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Permission;

class PermissionsSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            // Permisos para publicaciones
            ['name' => 'create_posts', 'description' => 'Create new posts'],
            ['name' => 'read_posts', 'description' => 'Read posts'],
            ['name' => 'update_posts', 'description' => 'Update existing posts'],
            ['name' => 'delete_posts', 'description' => 'Delete posts'],
            // Permisos para categorías
            ['name' => 'create_categories', 'description' => 'Create new categories'],
            ['name' => 'read_categories', 'description' => 'Read categories'],
            ['name' => 'update_categories', 'description' => 'Update existing categories'],
            ['name' => 'delete_categories', 'description' => 'Delete categories'],
            // Permisos para etiquetas
            ['name' => 'create_tags', 'description' => 'Create new tags'],
            ['name' => 'read_tags', 'description' => 'Read tags'],
            ['name' => 'update_tags', 'description' => 'Update existing tags'],
            ['name' => 'delete_tags', 'description' => 'Delete tags'],
            // Permisos para comentarios
            ['name' => 'create_comments', 'description' => 'Create new comments'],
            ['name' => 'read_comments', 'description' => 'Read comments'],
            ['name' => 'update_comments', 'description' => 'Update existing comments'],
            ['name' => 'delete_comments', 'description' => 'Delete comments'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}

