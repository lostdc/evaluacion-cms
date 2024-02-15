<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Traits\ApiResponserTrait;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;



class CategoryController extends Controller
{
    use ApiResponserTrait;

    public function index()
    {
        try {
            $categories = Category::all();
            return $this->success('Categorías obtenidas con éxito', 200, $categories);
        } catch (\Exception $e) {
            Log::error('Error al obtener listado de Categorías: ' . $e->getMessage());
            return $this->error('Error interno al obtener las categorías', 500, []);
        }
    }

    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            return $this->success('Categoría obtenida con éxito', 200, $category);
        } catch (\Exception $e) {
            Log::error('Error al obtener la Categoría: ' . $e->getMessage());
            return $this->error('Categoría no encontrada', 404, []);
        }
    }

    public function store(StoreCategoryRequest $request)
    {
        try {
            $this->authorize('create', Category::class);
            $category = Category::create($request->all());
            return $this->success('Categoría creada con éxito', 201, $category);
        } catch (\Exception $e) {
            Log::error('Error al crear la Categoría: ' . $e->getMessage());
            return $this->error('Error interno al crear la categoría', 500, []);
        }
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);
            //$this->authorize('update', $category);
            $category->update($request->all());
            return $this->success('Categoría actualizada con éxito', 200, $category);
        } catch (\Exception $e) {
            Log::error('Error al actualizar la Categoría: ' . $e->getMessage());
            return $this->error('Error interno al actualizar la categoría', 500, []);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $this->authorize('delete', $category);
            // Verifica si la categoría está asignada a algún post.
            if ($category->posts()->count() > 0) {
                return $this->error('La categoría no se puede eliminar porque está en uso.', 400);
            }
    
            $category->delete();
            return $this->success('Categoría eliminada con éxito', 200, []);
        } catch (\Exception $e) {
            Log::error('Error al eliminar la Categoría: ' . $e->getMessage());
            return $this->error('Error interno al eliminar la categoría', 500, []);
        }
    }
}
