<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Traits\ApiResponserTrait;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    use ApiResponserTrait;

    public function index()
    {
        try {
            $comments = Comment::all();
            return $this->success('Comentarios obtenidos con éxito', 200, $comments);
        } catch (\Exception $e) {
            Log::error("Error al obtener listado de Comentarios: " . $e->getMessage());
            return $this->error('Error interno al obtener los comentarios', 500, []);
        }
    }

    public function show($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            return $this->success('Comentario obtenido con éxito', 200, $comment);
        } catch (\Exception $e) {
            Log::error("Error al obtener el Comentario: " . $e->getMessage());
            return $this->error('Comentario no encontrado', 404, []);
        }
    }

    public function store(StoreCommentRequest $request)
    {
        try {
            $comment = Comment::create($request->validated());
            return $this->success('Comentario creado con éxito', 201, $comment);
        } catch (\Exception $e) {
            Log::error("Error al crear el Comentario: " . $e->getMessage());
            return $this->error('Error interno al crear el comentario', 500, []);
        }
    }

    public function update(UpdateCommentRequest $request, $id)
    {
        try {
            $comment = Comment::findOrFail($id);
            // Agregar lógica de autorización aquí si es necesario
            $comment->update($request->validated());
            return $this->success('Comentario actualizado con éxito', 200, $comment);
        } catch (\Exception $e) {
            Log::error("Error al actualizar el Comentario: " . $e->getMessage());
            return $this->error('Error interno al actualizar el comentario', 500, []);
        }
    }

    public function destroy($id)
    {
        try {
            $comment = Comment::findOrFail($id);
            // Agregar lógica de autorización aquí si es necesario
            $comment->delete();
            return $this->success('Comentario eliminado con éxito', 200, []);
        } catch (\Exception $e) {
            Log::error("Error al eliminar el Comentario: " . $e->getMessage());
            return $this->error('Error interno al eliminar el comentario', 500, []);
        }
    }
}
