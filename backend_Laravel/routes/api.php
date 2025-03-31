<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CodePromoController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('table_bord', [ProductsController::class, 'index'])->name('table_bord');
    Route::get('table_bord/{category_id}', [ProductsController::class, 'typeProduit'])->name('typeProduit');

    Route::post('/products', [ProductsController::class, 'store']);
    Route::get('/products', [ProductsController::class, 'index']);
    Route::delete('/products/{id}', [ProductsController::class, 'destroy']);

    Route::get('/user', [AuthController::class, 'user']);

    // Ingredients routes
    Route::get('ingredients', [IngredientsController::class, 'index']);
    Route::post('ingredients', [IngredientsController::class, 'store']);
    Route::get('ingredients/{id}', [IngredientsController::class, 'show']);
    Route::put('ingredients/{id}', [IngredientsController::class, 'update']);
    Route::delete('ingredients/{id}', [IngredientsController::class, 'destroy']);

    // Categories routes
    Route::get('categories', [CategoriesController::class, 'index']);
    Route::post('categories', [CategoriesController::class, 'store']);
    Route::get('categories/{id}', [CategoriesController::class, 'show']);
    Route::put('categories/{id}', [CategoriesController::class, 'update']);
    Route::delete('categories/{id}', [CategoriesController::class, 'destroy']);

    // Code Promo routes
    Route::get('code_promos', [CodePromoController::class, 'index']);
    Route::post('code_promos', [CodePromoController::class, 'store']);
    Route::get('code_promos/{id}', [CodePromoController::class, 'show']);
    Route::put('code_promos/{id}', [CodePromoController::class, 'update']);
    Route::delete('code_promos/{id}', [CodePromoController::class, 'destroy']);
});