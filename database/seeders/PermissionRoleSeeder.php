<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asigna todos los permisos al rol de Admin
        $adminRole = Role::where('name', 'administrador')->first();
        $adminPermissions = Permission::all();
        $adminRole->permissions()->sync($adminPermissions->pluck('id')->toArray());

        // Asigna permisos específicos al rol de Editor
        $editorRole = Role::where('name', 'editor')->first();
        $editorPermissions = Permission::whereIn('name', [
            //post
            'create_posts',
            'read_posts',
            'update_posts',
            // comments
            'create_comments',
            'read_comments',
            'update_comments',
            // tags
            'read_tags',
            //categories
            'read_categories'
    
        ])->get();
        $editorRole->permissions()->sync($editorPermissions->pluck('id')->toArray());

        // Asigna permisos al invitado
        $viewerRole = Role::where('name', 'invitado')->first();
        $viewerPermissions = Permission::whereIn('name', [
            //post
            'read_posts',
            //comments
            'create_comments',
            'read_comments',
            'update_comments',

            // Añade permisos de lectura para cualquier otro contenido relevante
        ])->get();
        $viewerRole->permissions()->sync($viewerPermissions->pluck('id')->toArray());
    }
}
