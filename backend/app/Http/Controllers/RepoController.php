<?php

namespace App\Http\Controllers;

use App\Business\Features\Repos\Queries\GetRepoBySlugQuery\GetRepoBySlugQuery;
use App\Business\Features\Repos\Queries\GetRepoBySlugQuery\GetRepoBySlugRequest;
use App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery\GetRepoListWithPaginationQuery;
use App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery\GetRepoListWithPaginationRequest;
use App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand\IncrementRepoViewCountCommand;
use App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand\IncrementRepoViewCountRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RepoController extends Controller
{
    public function index(Request $request, string $lang, GetRepoListWithPaginationQuery $query): JsonResponse
    {
        $repoRequest = new GetRepoListWithPaginationRequest(
            lang: $lang,
            sort: $request->input('sort', 'newest'),
            perPage: $request->integer('per_page', 12),
            page: $request->integer('page', 1)
        );

        $response = $query->handle($repoRequest);

        return response()->json([
            'data' => $response->items,
            'meta' => $response->meta,
        ]);
    }

    public function show(string $lang, string $slug, GetRepoBySlugQuery $query): JsonResponse
    {
        $repoRequest = new GetRepoBySlugRequest($lang, $slug);
        $result = $query->handle($repoRequest);

        return response()->json($result);
    }

    public function incrementViewCount(int $id, IncrementRepoViewCountCommand $command): JsonResponse
    {
        $viewRequest = new IncrementRepoViewCountRequest($id);
        $result = $command->handle($viewRequest);

        return response()->json($result);
    }

    public function indexForModerator(Request $request): JsonResponse
    {
        $perPage = $request->integer('per_page', 10);
        $repos = \App\Models\Repo::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json([
            'data' => $repos->items(),
            'total' => $repos->total(),
            'current_page' => $repos->currentPage(),
            'last_page' => $repos->lastPage()
        ]);
    }

    public function getDetails(int $id, \App\Business\Features\Repos\Queries\GetRepoDetailsQuery\GetRepoDetailsQuery $query): JsonResponse
    {
        return response()->json($query->handle($id));
    }

    public function createRepo(Request $request, \App\Business\Features\Repos\Commands\CreateRepoCommand\CreateRepoCommand $command, \App\Business\Features\Repos\Commands\CreateRepoCommand\CreateRepoCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        if (isset($data['tech_stack']) && is_string($data['tech_stack'])) {
            $data['tech_stack'] = json_decode($data['tech_stack'], true);
        }
        if (isset($data['is_public'])) {
            $data['is_public'] = filter_var($data['is_public'], FILTER_VALIDATE_BOOLEAN);
        }
        
        $validator->validate($data);

        $createRequest = new \App\Business\Features\Repos\Commands\CreateRepoCommand\CreateRepoCommandRequest(
            title: $request->input('title'),
            slug: $request->input('slug'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
            main_image: $request->file('main_image'),
            gallery_images: $request->file('gallery_images'),
            project_url: $request->input('project_url'),
            repo_url: $request->input('repo_url'),
            is_public: $data['is_public'] ?? true,
            tech_stack: $data['tech_stack'] ?? null
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateRepo(Request $request, \App\Business\Features\Repos\Commands\UpdateRepoCommand\UpdateRepoCommand $command, \App\Business\Features\Repos\Commands\UpdateRepoCommand\UpdateRepoCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        if (isset($data['tech_stack']) && is_string($data['tech_stack'])) {
            $data['tech_stack'] = json_decode($data['tech_stack'], true);
        }
        if (isset($data['existing_gallery_images']) && is_string($data['existing_gallery_images'])) {
            $data['existing_gallery_images'] = json_decode($data['existing_gallery_images'], true);
        }
        if (isset($data['delete_main_image'])) {
            $data['delete_main_image'] = filter_var($data['delete_main_image'], FILTER_VALIDATE_BOOLEAN);
        }
        if (isset($data['is_public'])) {
            $data['is_public'] = filter_var($data['is_public'], FILTER_VALIDATE_BOOLEAN);
        }

        $validator->validate($data);

        $updateRequest = new \App\Business\Features\Repos\Commands\UpdateRepoCommand\UpdateRepoCommandRequest(
            id: (int) $request->input('id'),
            title: $request->input('title'),
            slug: $request->input('slug'),
            description_en: $request->input('description_en'),
            description_tr: $request->input('description_tr'),
            main_image: $request->file('main_image'),
            delete_main_image: $data['delete_main_image'] ?? false,
            gallery_images: $request->file('gallery_images'),
            existing_gallery_images: $data['existing_gallery_images'] ?? [],
            project_url: $request->input('project_url'),
            repo_url: $request->input('repo_url'),
            is_public: $data['is_public'] ?? true,
            tech_stack: $data['tech_stack'] ?? null
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteRepo(Request $request, \App\Business\Features\Repos\Commands\DeleteRepoCommand\DeleteRepoCommand $command): JsonResponse
    {
        $id = $request->header('id');
        if (!$id) {
            return response()->json(['message' => 'Repo ID required'], 400);
        }
        return response()->json($command->handle((int)$id));
    }
}
