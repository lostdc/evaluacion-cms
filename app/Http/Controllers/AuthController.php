<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;

use App\Traits\ApiResponserTrait;

class AuthController extends Controller
{
    use ApiResponserTrait;

    public function register(CreateUserRequest $request)
    {
        try {      
            //se quitan datos sensibles 
            Log::info('Proceso de registro de Usuario : '.$this->resumenInfo(__LINE__,$request, ['password', 'password_confirmation'] ));          
            // Los datos ya están validados y saneados gracias a CreateUserRequest
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password),
            ]);

            Log::info('Usuario registrado correctamente');
            return $this->success("Usuario Creado",201);


        } catch (\Exception $e) {
            // Manejo de la excepción
            Log::error('Error al registrar usuario: ' . $this->resumenError($e));
            // Devolver una respuesta de error
            return response()->json(['error' => 'Error al registrar usuario. Por favor, contacta al administradore.'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            Log::info('Intento de inicio de sesión: ' . $this->resumenInfo(__LINE__, $request));

            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $token = $user->createToken('MyAppCMS')->accessToken;
                Log::info('Inicio de sesión exitoso para el usuario: ' . $user->email);
                return $this->success("Inicio de sesión exitoso", 200, ["token" => $token]);
            } else {
                Log::warning('Credenciales no válidas para el email: ' . $request->email);
                return response()->json(['error' => 'Credenciales no válidas'], 401);
            }
        } catch (Exception $e) {
            Log::error('Error al intentar iniciar sesión: ' . $this->resumenError($e));
            return response()->json(['error' => 'Error al intentar iniciar sesión. Por favor, contacta al administrador.'], 500);
        }
    }


}
