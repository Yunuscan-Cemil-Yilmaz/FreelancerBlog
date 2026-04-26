<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\RepoController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\AdminAuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('admin/login', [AdminController::class, 'login']);
Route::get('admin/oauth', [AdminController::class, 'oauth']);
Route::post('admin/logout', [AdminController::class, 'logout']);

Route::post('moderator/login', [ModeratorController::class, 'login']);
Route::get('moderator/oauth', [ModeratorController::class, 'oauth']);
Route::post('moderator/logout', [ModeratorController::class, 'logout']);

Route::middleware(AdminAuthMiddleware::class)->prefix('admin')->group(function () {
    Route::get('domains', [DomainController::class, 'getDomainsWithPagination']);
    Route::get('domain-details', [DomainController::class, 'getDomainDetails']);
    
    // Moderator management (for Admin)
    Route::get('moderators', [ModeratorController::class, 'getModerators']);
    Route::post('moderators', [ModeratorController::class, 'createModerator']);
    Route::delete('moderators', [ModeratorController::class, 'deleteModerator']);
    Route::patch('moderators/status', [ModeratorController::class, 'setActiveStatusModerator']);
    Route::patch('moderators/domain', [ModeratorController::class, 'updateModeratorDomain']);
    Route::patch('moderators/reset-password', [ModeratorController::class, 'resetModeratorPassword']);
});

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
