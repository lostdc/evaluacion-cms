<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Cookie;
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

            // Asignar rol por defecto invitado (ID 3) al usuario
            $defaultRoleId = 3; // ID del rol por defecto
            $roleUser = new RoleUser();
            $roleUser->user_id = $user->id;
            $roleUser->role_id = $defaultRoleId;
            $roleUser->save();

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
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (Auth::attempt($request->only('email', 'password'))) {
            $tokenResult = Auth::user()->createToken('api-token');
            $token = $tokenResult->token;
            $token->save();
            
            $user = Auth::user();
            $role = $user->roles()->first();
            $permissions = $role ? $role->permissions()->pluck('name')->toArray() : [];
    
            return response()->json([
                'token' => $tokenResult->accessToken,
                'role' => $role ? $role->name : null,
                'permissions' => $permissions
            ], 200);
        }
    
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        // Lógica de logout...
        $cookie = Cookie::forget('token');
        return response()->json(['message' => 'Sesión cerrada correctamente'])->withCookie($cookie);
    }


}
