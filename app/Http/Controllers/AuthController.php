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
      //  try {      
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
            // Devolver los datos del usuario junto con el token de acceso
            
            return $this->success("Usuario Creado",201);
    
        //} catch (\Exception $e) {
            // Manejo de la excepción
            Log::error('Error al registrar usuario: ' . $this->resumenError($e));
            // Devolver una respuesta de error
            return $this->error('Error al registrar usuario. Por favor, contacta al administrador', 500);
       // }
    }
    
    public function login(Request $request)
    {
        try {     
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
        
            if (Auth::attempt($request->only('email', 'password'))) {
                $tokenResult = Auth::user()->createToken('api-token');
                $token = $tokenResult->plainTextToken; // Corregido aquí
                
                $user = Auth::user();
                $role = $user->roles()->first();
                $permissions = $role ? $role->permissions()->pluck('name')->toArray() : [];
        
                return response()->json([
                    'token' => $token, // Usar la variable corregida
                    'role' => $role ? $role->name : null,
                    'permissions' => $permissions
                ], 200);
            }
            return response()->json(['message' => 'Unauthorized'], 401);
    
        } catch (\Exception $e) {
            // Manejo de la excepción
            Log::error('Error interno no se ha logrado loguear: ' . $this->resumenError($e));
            // Devolver una respuesta de error
            return $this->error('Error interno al loguear',500);
        }
    }


    

    public function logout(Request $request)
    {
        try {
            // Verifica si hay un usuario autenticado antes de intentar revocar el token
            if ($request->user()) {
                $token = $request->user()->token();
                if($token) {
                    $token->revoke();
                    Log::info('Token revoked successfully.');
                } else {
                    Log::warning('No token found for the user.');
                }
            } else {
                Log::warning('No authenticated user found.');
            }
            
            return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
        } catch (\Exception $e) {
            // Handle the exception
            Log::error('Error al cerrar sesión: ' . $e->getMessage());
            return response()->json(['message' => 'Error al cerrar sesión'], 500);
        }
    }
    




}

