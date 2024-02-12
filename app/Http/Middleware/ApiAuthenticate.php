<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class ApiAuthenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        if ($request->hasCookie('token')) {
            $token = $request->cookie('token');
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }
        
        if ($this->authenticate($request, $guards) === 'authentication_failed') {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        
        return $next($request);
    }

    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                $this->auth->shouldUse($guard);
                return;
            }
        }

        return 'authentication_failed';
    }
}
