<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Requests\CreateUserRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('passport:install');
        $this->controller = new AuthController();
    }

    /** @test */
    public function it_can_register_a_user()
    {
        // Datos de la solicitud para registrar un nuevo usuario
        $requestData = [
            'name' => 'John Doex',
            'email' => 'johnx@example.com',
            'password' => 'Abc*1234',
            'password_confirmation' => 'Abc*1234',
        ];

        // Realizar una petición POST al endpoint de registro
        $response = $this->post('/api/register', $requestData);

        // Verificar que el usuario fue creado correctamente en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'johnx@example.com',
        ]);
    
        // Verificar que se devuelve una respuesta de éxito (201 Created)
        $response->assertStatus(201);
    }

    /** @test */
    public function it_fails_to_register_a_user_with_invalid_password()
    {
        // Datos de solicitud que se espera fallen la validación
        $requestData = [
            'name' => 'Juan Dom',
            'email' => 'juan@example.com',
            'password' => 'passwor', // Contraseña intencionadamente inválida para probar la validación
            'password_confirmation' => 'passwor',
        ];

        // Realizar una petición POST al endpoint de registro
        $response = $this->post('/api/register', $requestData);

        // Verificar que la respuesta tenga el estado 422 Unprocessable Entity
        $response->assertStatus(422);

        $response->assertJson([
            "status" => "Error",
            "message" => "Credenciales incorrectas",
            "data" => [
                "The password field must be at least 8 characters.",
                "The password field format is invalid."
            ]
        ]);

        // Asegurar que el usuario no fue creado en la base de datos
        $this->assertDatabaseMissing('users', [
            'email' => 'juan@example.com',
        ]);
    }

}
