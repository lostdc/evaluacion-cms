<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Traits\ApiResponserTrait;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    use ApiResponserTrait;
    public function getAllPosts(Request $request)
    {
        try{
            // Obtener todos los posts con su categoría, autor y lista de tags asociados
            $posts = Post::with('category', 'user', 'tags');

            // Aplicar filtro por categoría si se proporciona
            if ($request->has('category') && $request->input('category') != "") {
                $posts->where('category_id', $request->input('category'));
            }

            // Aplicar filtro por título (post title o tag name) si se proporciona
            if ($request->has('title')) {
                $title = $request->input('title');
                $posts->where(function ($query) use ($title) {
                    $query->where('title', 'like', "%$title%")
                        ->orWhereHas('tags', function ($query) use ($title) {
                            $query->where('name', 'like', "%$title%");
                        });
                });
            }

            // Obtener los posts filtrados
            $filteredPosts = $posts->get();
            // Devolver la respuesta JSON con los posts filtrados
            return $this->success('Post Obtenidos',200,$filteredPosts);

        } catch (\Exception $e) {
            // Manejo de la excepción
            Log::error('Error al obtener listado de Posts: ' . $this->resumenError($e));
            // Devolver una respuesta de error
            return $this->error('Error interno al obtener los post',500,[]);
        }
    }

    public function store(StorePostRequest $request)
    {
        try {
            $post = Post::create($request->validated());
            return $this->success('Post creado con éxito', 201, $post);
        } catch (\Exception $e) {
            Log::error('Error al crear el Post: ' . $e->getMessage());
            return $this->error('Error interno al crear el post', 500, []);
        }
    }

    public function show($id)
    {
        $post = Post::with(['category' => function($query) {
            $query->select('categories.id', 'categories.name');
        }, 'user' => function($query) {
            $query->select('users.id', 'users.name');
        }, 'tags' => function($query) {
            $query->select('tags.id', 'tags.name');
        }])->findOrFail($id);

        $post->makeHidden(['updated_at', 'created_at']); //hidden columns
            // Eliminar la propiedad 'pivot' de cada tag manualmente
        if ($post->tags && $post->tags->isNotEmpty()) {
            $post->tags->transform(function ($tag) {
                return $tag->makeHidden('pivot');
            });
        }

        return $this->success('Post obtenido con éxito', 200, $post);
    }

    public function update(UpdatePostRequest $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->update($request->validated());
            return $this->success('Post actualizado con éxito', 200, $post);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el Post: ' . $e->getMessage());
            return $this->error('Error interno al actualizar el post', 500, []);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return $this->success('Post eliminado con éxito', 200, []);
        } catch (\Exception $e) {
            Log::error('Error al eliminar el Post: ' . $e->getMessage());
            return $this->error('Error interno al eliminar el post', 500, []);
        }
    }
}
