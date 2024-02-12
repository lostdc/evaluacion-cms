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

    //public function login(Request $request)
    //{
    //    //try {
    //        Log::info('Intento de inicio de sesión: ' . $this->resumenInfo(__LINE__, $request));
    //    
    //        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    //            $user = Auth::user();
    //    
    //            // Inicio de sesión exitoso, Sanctum utilizará las cookies de sesión.
    //            Log::info('Inicio de sesión exitoso para el usuario: ' . $user->email);
    //    
    //            // Opcional: Puedes querer generar un nuevo token CSRF después del inicio de sesión
    //            $request->session()->regenerateToken();
    //    
    //            return response()->json([
    //                'success' => true,
    //                'message' => 'Inicio de sesión exitoso',
    //                'user' => $user
    //            ], 200);
    //        } else {
    //            Log::warning('Credenciales no válidas para el email: ' . $request->email);
    //            return response()->json(['error' => 'Credenciales no válidas'], 401);
    //        }
    //    //} catch (\Exception $e) {
    //    //    Log::error('Error al intentar iniciar sesión: ' . $this->resumenError($e));
    //    //    return response()->json(['error' => 'Error al intentar iniciar sesión. Por favor, contacta al administrador.'], 500);
    //    //}
    //}

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (Auth::attempt($request->only('email', 'password'))) {
            // Crea un token personal de acceso para el usuario autenticado
            $tokenResult = Auth::user()->createToken('api-token');
            $token = $tokenResult->token;
            $token->save();
    
            // Devuelve el token al cliente
            return response()->json(['token' => $tokenResult->accessToken], 200);
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
