<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class PostsSeeder extends Seeder
{
    public function run()
    {
        // Arreglo de títulos de ejemplo
        $titles = [
            'Las Últimas Tendencias en Tecnología',
            'Cómo Mejorar tu Rutina de Ejercicios',
            'Los Destinos de Viaje Más Populares de 2024',
            'Consejos para una Vida Saludable',
            'Recetas Fáciles y Rápidas para el Día a Día',
            'La Influencia del Arte en la Sociedad Moderna',
        ];

        // Crear 6 posts
        foreach ($titles as $index => $title) {
            $post = Post::create([
                'category_id' => rand(1, 10), // Categoría aleatoria basada en las categorías disponibles
                'author_id' => 1, // Asumiendo que hay al menos un usuario (autor) con id 1
                'title' => $title,
                'content' => "Contenido de ejemplo para el post titulado '{$title}'.",
            ]);

            // Asignar entre 0 y 3 etiquetas de forma aleatoria
            $tagsIds = Tag::inRandomOrder()->take(rand(0, 3))->pluck('id');
            $post->tags()->attach($tagsIds);
        }
    }
}
