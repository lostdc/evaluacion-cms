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

}
