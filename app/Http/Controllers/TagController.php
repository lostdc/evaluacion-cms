<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Traits\ApiResponserTrait;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;

class TagController extends Controller
{
    use ApiResponserTrait;

    public function index()
    {
        try {
            $tags = Tag::all();
            return $this->success('Tags obtenidos con éxito', 200, $tags);
        } catch (\Exception $e) {
            Log::error('Error al obtener listado de Tags: ' . $e->getMessage());
            return $this->error('Error interno al obtener los tags', 500, []);
        }
    }

    public function show($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            return $this->success('Tag obtenido con éxito', 200, $tag);
        } catch (\Exception $e) {
            Log::error('Error al obtener el Tag: ' . $e->getMessage());
            return $this->error('Tag no encontrado', 404, []);
        }
    }

    public function store(StoreTagRequest $request)
    {
        try {
            $tag = Tag::create($request->validated());
            return $this->success('Tag creado con éxito', 201, $tag);
        } catch (\Exception $e) {
            Log::error('Error al crear el Tag: ' . $e->getMessage());
            return $this->error('Error interno al crear el tag', 500, []);
        }
    }

    public function update(UpdateTagRequest $request, $id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->update($request->validated());
            return $this->success('Tag actualizado con éxito', 200, $tag);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el Tag: ' . $e->getMessage());
            return $this->error('Error interno al actualizar el tag', 500, []);
        }
    }

    public function destroy($id)
    {
        try {
            $tag = Tag::findOrFail($id);
    
            // Verifica si la etiqueta está asignada a algún post.
            if ($tag->posts()->count() > 0) {
                return $this->error('La etiqueta no se puede eliminar porque está en uso.', 400);
            }
    
            $tag->delete();
            return $this->success('Etiqueta eliminada con éxito', 200, []);
        } catch (\Exception $e) {
            Log::error('Error al eliminar la Etiqueta: ' . $e->getMessage());
            return $this->error('Error interno al eliminar la etiqueta', 500, []);
        }
    }
}
