<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Traits\ApiResponserTrait;
use Illuminate\Support\Facades\Log;

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
}
