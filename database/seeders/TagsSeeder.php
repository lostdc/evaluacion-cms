<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagsSeeder extends Seeder
{
    public function run()
    {
        $tags = [
            'tecnologia',
            'aviacion',
            'programacion',
            'qa',
            'emprendimiento',
            'musica',
            // Agrega más etiquetas hasta llegar a 20
            'salud',
            'deporte',
            'moda',
            'viajes',
            'bienestar',
            'cocina',
            'arte',
            'cultura',
            'negocios',
            'educacion',
            'entretenimiento',
            'ciencia',
            'literatura',
            'historia'
        ];

        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
