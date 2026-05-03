<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\ProfessionalSkillController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\RepoController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\SubCategoryController;
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
    Route::post('/moderators/reset-password', [ModeratorController::class, 'resetModeratorPassword']);
    Route::get('/moderators', [ModeratorController::class, 'index']);
    Route::post('moderators', [ModeratorController::class, 'createModerator']);
    Route::delete('moderators', [ModeratorController::class, 'deleteModerator']);
    Route::patch('moderators/status', [ModeratorController::class, 'setActiveStatusModerator']);
    Route::patch('moderators/domain', [ModeratorController::class, 'updateModeratorDomain']);
    Route::patch('moderators/reset-password', [ModeratorController::class, 'resetModeratorPassword']);

    // Category Management
    Route::post('/categories/create', [CategoryController::class, 'createCategory']);
    Route::post('/categories/update', [CategoryController::class, 'updateCategory']);
    Route::post('/categories/delete', [CategoryController::class, 'deleteCategory']);

    // SubCategory Management
    Route::get('/sub-categories/{lang}', [SubCategoryController::class, 'index']);
    Route::post('/sub-categories/create', [SubCategoryController::class, 'createSubCategory']);
    Route::post('/sub-categories/update', [SubCategoryController::class, 'updateSubCategory']);
    Route::post('/sub-categories/delete', [SubCategoryController::class, 'deleteSubCategory']);

    // Education Management
    Route::get('/educations/{lang}', [EducationController::class, 'index']);
    Route::post('/educations/create', [EducationController::class, 'createEducation']);
    Route::post('/educations/update', [EducationController::class, 'updateEducation']);
    Route::post('/educations/update-order', [EducationController::class, 'updateEducationOrder']);
    Route::post('/educations/delete', [EducationController::class, 'deleteEducation']);

    // Experience Management
    Route::get('/experiences/{lang}', [ExperienceController::class, 'index']);
    Route::post('/experiences/create', [ExperienceController::class, 'createExperience']);
    Route::post('/experiences/update', [ExperienceController::class, 'updateExperience']);
    Route::post('/experiences/update-order', [ExperienceController::class, 'updateExperienceOrder']);
    Route::post('/experiences/delete', [ExperienceController::class, 'deleteExperience']);

    // Professional Skill Management
    Route::get('/professional-skills/{lang}', [ProfessionalSkillController::class, 'index']);
    Route::post('/professional-skills/create', [ProfessionalSkillController::class, 'createProfessionalSkill']);
    Route::post('/professional-skills/update', [ProfessionalSkillController::class, 'updateProfessionalSkill']);
    Route::post('/professional-skills/update-order', [ProfessionalSkillController::class, 'updateProfessionalSkillOrder']);
    Route::post('/professional-skills/delete', [ProfessionalSkillController::class, 'deleteProfessionalSkill']);

    // Reference Management
    Route::get('/references/{lang}', [ReferenceController::class, 'index']);
    Route::post('/references/create', [ReferenceController::class, 'createReference']);
    Route::post('/references/update', [ReferenceController::class, 'updateReference']);
    Route::post('/references/update-order', [ReferenceController::class, 'updateReferenceOrder']);
    Route::post('/references/delete', [ReferenceController::class, 'deleteReference']);

    // Skill Management
    Route::get('/skills/{lang}', [SkillController::class, 'index']);
    Route::post('/skills/create', [SkillController::class, 'createSkill']);
    Route::post('/skills/update', [SkillController::class, 'updateSkill']);
    Route::post('/skills/update-order', [SkillController::class, 'updateSkillOrder']);
    Route::post('/skills/delete', [SkillController::class, 'deleteSkill']);
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
