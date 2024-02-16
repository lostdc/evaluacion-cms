<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Tag;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PostsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Arreglo de títulos de ejemplo
        $titles = [
            'Las Últimas Tendencias en Tecnología',
            'Cómo Mejorar tu Rutina de Ejercicios',
            'Los Destinos de Viaje Más Populares de 2024',
            'Consejos para una Vida Saludable',
            'Recetas Fáciles y Rápidas para el Día a Día',
        ];

        $author_id = 1;
        foreach ($titles as $index => $title) {
            $post = Post::create([
                'category_id' => rand(1, 10),
                'author_id' => $author_id,
                'title' => $title,
                'content' => "Contenido de ejemplo para el post titulado '{$title}'.",
            ]);

            // Asignar entre 0 y 3 etiquetas de forma aleatoria
            $tagsIds = Tag::inRandomOrder()->take(rand(0, 3))->pluck('id');
            $post->tags()->attach($tagsIds);

            // Agregar entre 2 y 6 comentarios por post
            $commentsCount = rand(2, 6);
            for ($i = 0; $i < $commentsCount; $i++) {
                Comment::create([
                    'post_id' => $post->id,
                    'author_id' => rand(1, 10), // ID de autor aleatorio entre 1 y 10
                    'content' => $faker->paragraph, // Contenido generado aleatoriamente
                ]);
            }

            $author_id++;
        }
    }
}
