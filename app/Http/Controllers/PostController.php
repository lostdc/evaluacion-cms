<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function getAllPosts(Request $request)
    {
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
        return response()->json($filteredPosts, 200);
    }
}
