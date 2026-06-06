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
use App\Http\Controllers\InteractionRequestController;
use App\Http\Controllers\BlogInteractionRequestController;
use App\Http\Controllers\RepoInteractionRequestController;
use App\Http\Middleware\AdminAuthMiddleware;
use App\Http\Middleware\ModeratorAuthMiddleware;
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
    Route::post('domains/create', [DomainController::class, 'createDomain']);
    Route::post('domains/update', [DomainController::class, 'updateDomain']);
    Route::post('domains/cascade-update', [DomainController::class, 'cascadeUpdateDomain']);
    Route::post('domains/delete', [DomainController::class, 'deleteDomain']);
    
    // Moderator management (for Admin)
    Route::get('moderators', [ModeratorController::class, 'getModerators']);
    Route::post('/moderators/reset-password', [ModeratorController::class, 'resetModeratorPassword']);
    Route::post('moderators', [ModeratorController::class, 'createModerator']);
    Route::delete('moderators', [ModeratorController::class, 'deleteModerator']);
    Route::patch('moderators/status', [ModeratorController::class, 'setActiveStatusModerator']);
    Route::patch('moderators/domain', [ModeratorController::class, 'updateModeratorDomain']);
});



Route::middleware(ModeratorAuthMiddleware::class)->prefix('moderator')->group(function () {
    // Category Management
    Route::get('/categories', [CategoryController::class, 'indexForModerator']);
    Route::post('/categories/create', [CategoryController::class, 'createCategory']);
    Route::post('/categories/update', [CategoryController::class, 'updateCategory']);
    Route::post('/categories/delete', [CategoryController::class, 'deleteCategory']);

    // SubCategory Management
    Route::get('/sub-categories', [SubCategoryController::class, 'indexForModerator']);
    Route::get('/sub-categories/{lang}', [SubCategoryController::class, 'index']);
    Route::post('/sub-categories/create', [SubCategoryController::class, 'createSubCategory']);
    Route::post('/sub-categories/update', [SubCategoryController::class, 'updateSubCategory']);
    Route::post('/sub-categories/delete', [SubCategoryController::class, 'deleteSubCategory']);

    // Education Management
    Route::get('/educations', [EducationController::class, 'indexForModerator']);
    Route::post('/educations/create', [EducationController::class, 'createEducation']);
    Route::post('/educations/update', [EducationController::class, 'updateEducation']);
    Route::post('/educations/update-order', [EducationController::class, 'updateEducationOrder']);
    Route::post('/educations/delete', [EducationController::class, 'deleteEducation']);

    // Experience Management
    Route::get('/experiences', [ExperienceController::class, 'indexForModerator']);
    Route::post('/experiences/create', [ExperienceController::class, 'createExperience']);
    Route::post('/experiences/update', [ExperienceController::class, 'updateExperience']);
    Route::post('/experiences/update-order', [ExperienceController::class, 'updateExperienceOrder']);
    Route::post('/experiences/delete', [ExperienceController::class, 'deleteExperience']);

    // Professional Skill Management
    Route::get('/professional-skills', [ProfessionalSkillController::class, 'indexForModerator']);
    Route::post('/professional-skills/create', [ProfessionalSkillController::class, 'createProfessionalSkill']);
    Route::post('/professional-skills/update', [ProfessionalSkillController::class, 'updateProfessionalSkill']);
    Route::post('/professional-skills/update-order', [ProfessionalSkillController::class, 'updateProfessionalSkillOrder']);
    Route::post('/professional-skills/delete', [ProfessionalSkillController::class, 'deleteProfessionalSkill']);
    
    // Reference Management
    Route::get('/references', [ReferenceController::class, 'indexForModerator']);
    Route::post('/references/create', [ReferenceController::class, 'createReference']);
    Route::post('/references/update', [ReferenceController::class, 'updateReference']);
    Route::post('/references/update-order', [ReferenceController::class, 'updateReferenceOrder']);
    Route::post('/references/delete', [ReferenceController::class, 'deleteReference']);
    
    // Skill Management
    Route::get('/skills', [SkillController::class, 'indexForModerator']);
    Route::post('/skills/create', [SkillController::class, 'createSkill']);
    Route::post('/skills/update', [SkillController::class, 'updateSkill']);
    Route::post('/skills/update-order', [SkillController::class, 'updateSkillOrder']);
    Route::post('/skills/delete', [SkillController::class, 'deleteSkill']);

    // Blog Management
    Route::get('/blogs', [BlogController::class, 'indexForModerator']);
    Route::get('/blogs/{id}', [BlogController::class, 'getDetailsForModerator']);
    Route::post('/blogs/create', [BlogController::class, 'createBlog']);
    Route::post('/blogs/update', [BlogController::class, 'updateBlog']);
    Route::post('/blogs/delete', [BlogController::class, 'deleteBlog']);

    // Repo Management
    Route::get('/repos', [RepoController::class, 'indexForModerator']);
    Route::get('/repos/{id}', [RepoController::class, 'getDetails']);
    Route::post('/repos/create', [RepoController::class, 'createRepo']);
    Route::post('/repos/update', [RepoController::class, 'updateRepo']);
    Route::post('/repos/delete', [RepoController::class, 'deleteRepo']);
    // Interaction Request Management
    Route::get('/interaction-requests', [InteractionRequestController::class, 'index']);
    Route::get('/interaction-requests/{id}', [InteractionRequestController::class, 'show']);
    Route::patch('/interaction-requests/{id}/read', [InteractionRequestController::class, 'updateReadStatus']);
    Route::patch('/interaction-requests/{id}/handled', [InteractionRequestController::class, 'updateHandledStatus']);
    Route::patch('/interaction-requests/{id}/completed', [InteractionRequestController::class, 'updateCompletedStatus']);
    Route::patch('/interaction-requests/{id}/admin-note', [InteractionRequestController::class, 'updateAdminNote']);
    Route::delete('/interaction-requests/{id}', [InteractionRequestController::class, 'destroy']);
    Route::post('/interaction-requests/details', [InteractionRequestController::class, 'storeDetail']);
    Route::patch('/interaction-requests/details/{id}', [InteractionRequestController::class, 'updateDetail']);
    Route::delete('/interaction-requests/details/{id}', [InteractionRequestController::class, 'destroyDetail']);

    // Blog Interaction Request Management
    Route::get('/blog-interaction-requests', [BlogInteractionRequestController::class, 'index']);
    Route::get('/blog-interaction-requests/{id}', [BlogInteractionRequestController::class, 'show']);
    Route::patch('/blog-interaction-requests/{id}/read', [BlogInteractionRequestController::class, 'updateReadStatus']);
    Route::patch('/blog-interaction-requests/{id}/handled', [BlogInteractionRequestController::class, 'updateHandledStatus']);
    Route::patch('/blog-interaction-requests/{id}/completed', [BlogInteractionRequestController::class, 'updateCompletedStatus']);
    Route::patch('/blog-interaction-requests/{id}/admin-note', [BlogInteractionRequestController::class, 'updateAdminNote']);
    Route::delete('/blog-interaction-requests/{id}', [BlogInteractionRequestController::class, 'destroy']);
    Route::post('/blog-interaction-requests/details', [BlogInteractionRequestController::class, 'storeDetail']);
    Route::patch('/blog-interaction-requests/details/{id}', [BlogInteractionRequestController::class, 'updateDetail']);
    Route::delete('/blog-interaction-requests/details/{id}', [BlogInteractionRequestController::class, 'destroyDetail']);

    // Repo Interaction Request Management
    Route::get('/repo-interaction-requests', [RepoInteractionRequestController::class, 'index']);
    Route::get('/repo-interaction-requests/{id}', [RepoInteractionRequestController::class, 'show']);
    Route::patch('/repo-interaction-requests/{id}/read', [RepoInteractionRequestController::class, 'updateReadStatus']);
    Route::patch('/repo-interaction-requests/{id}/handled', [RepoInteractionRequestController::class, 'updateHandledStatus']);
    Route::patch('/repo-interaction-requests/{id}/completed', [RepoInteractionRequestController::class, 'updateCompletedStatus']);
    Route::patch('/repo-interaction-requests/{id}/admin-note', [RepoInteractionRequestController::class, 'updateAdminNote']);
    Route::delete('/repo-interaction-requests/{id}', [RepoInteractionRequestController::class, 'destroy']);
    Route::post('/repo-interaction-requests/details', [RepoInteractionRequestController::class, 'storeDetail']);
    Route::patch('/repo-interaction-requests/details/{id}', [RepoInteractionRequestController::class, 'updateDetail']);
    Route::delete('/repo-interaction-requests/details/{id}', [RepoInteractionRequestController::class, 'destroyDetail']);
});



Route::get('/experiences/{lang}', [ExperienceController::class, 'index']);
Route::get('/educations/{lang}', [EducationController::class, 'index']);
Route::get('/professional-skills/{lang}', [ProfessionalSkillController::class, 'index']);
Route::get('/references/{lang}', [ReferenceController::class, 'index']);
Route::get('/skills/{lang}', [SkillController::class, 'index']);




/*
|--------------------------------------------------------------------------
| Language-Prefixed Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('{lang}')->where(['lang' => 'en|tr'])->group(function () {
    // Interaction Requests
    Route::post('interaction-requests', [InteractionRequestController::class, 'store']);
    Route::post('blog-interaction-requests', [BlogInteractionRequestController::class, 'store']);
    Route::post('repo-interaction-requests', [RepoInteractionRequestController::class, 'store']);

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
