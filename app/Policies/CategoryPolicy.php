<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    public function create(User $user)
    {
        // Verificar si el usuario tiene el permiso 'create_categories'
        return $user->hasPermissionTo('create_categories');
    }

    public function update(User $user, Category $category)
    {
        // Verificar si el usuario tiene el permiso 'update_categories'
        return $user->hasPermissionTo('update_categories');
    }

    public function delete(User $user, Category $category)
    {
        // Verificar si el usuario tiene el permiso 'delete_categories'
        return $user->hasPermissionTo('delete_categories');
    }
}
