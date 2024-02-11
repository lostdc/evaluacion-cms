<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Tecnología',
            'description' => 'Categoría relacionada con tecnología y gadgets.'
        ]);

        Category::create([
            'name' => 'Deportes',
            'description' => 'Categoría relacionada con noticias y eventos deportivos.'
        ]);

        Category::create([
            'name' => 'Moda',
            'description' => 'Categoría relacionada con tendencias y estilo.'
        ]);

        Category::create([
            'name' => 'Viajes',
            'description' => 'Categoría relacionada con destinos turísticos y recomendaciones de viaje.'
        ]);

        Category::create([
            'name' => 'Salud y Bienestar',
            'description' => 'Categoría relacionada con consejos de salud y vida saludable.'
        ]);

        Category::create([
            'name' => 'Cocina',
            'description' => 'Categoría relacionada con recetas y gastronomía.'
        ]);

        Category::create([
            'name' => 'Arte y Cultura',
            'description' => 'Categoría relacionada con eventos culturales, arte y espectáculos.'
        ]);

        Category::create([
            'name' => 'Negocios',
            'description' => 'Categoría relacionada con emprendimiento, finanzas y consejos empresariales.'
        ]);

        Category::create([
            'name' => 'Educación',
            'description' => 'Categoría relacionada con consejos de estudio, cursos y educación en general.'
        ]);

        Category::create([
            'name' => 'Entretenimiento',
            'description' => 'Categoría relacionada con noticias y eventos de entretenimiento.'
        ]);
    }
}

