<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

//post
Route::get('/posts', [PostController::class, 'getAllPosts']);
//categorias
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
//tags
Route::get('/tags', [TagController::class, 'index']);
Route::get('/tags/{id}', [TagController::class, 'show']);


Route::middleware(['auth:sanctum'])->group(function () {
    //categorias
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    //tags
    Route::post('/tags', [TagController::class, 'store']);
    Route::put('/tags/{id}', [TagController::class, 'update']);
    Route::delete('/tags/{id}', [TagController::class, 'destroy']);
});

