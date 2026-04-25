<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RepoController;
use App\Http\Controllers\SitemapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('admin/login', [AdminController::class, 'login']);
Route::get('admin/oauth', [AdminController::class, 'oauth']);
Route::post('admin/logout', [AdminController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| Language-Prefixed Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('{lang}')->where(['lang' => 'en|tr'])->group(function () {
    // Blogs
    Route::get('blogs', [BlogController::class, 'index']);
    Route::get('blogs/{slug}', [BlogController::class, 'show']);

    // Repos
    Route::get('repos', [RepoController::class, 'index']);
    Route::get('repos/{slug}', [RepoController::class, 'show']);

    // Categories
    Route::get('categories', [CategoryController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| View Count Endpoints
|--------------------------------------------------------------------------
*/
Route::patch('blogs/{id}/view', [BlogController::class, 'incrementViewCount']);
Route::patch('repos/{id}/view', [RepoController::class, 'incrementViewCount']);

/*
|--------------------------------------------------------------------------
| Sitemap
|--------------------------------------------------------------------------
*/
Route::get('/sitemap.xml', [SitemapController::class, 'index']);
