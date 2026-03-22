<?php

namespace App\Http\Controllers;

use App\Models\Repo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RepoController extends Controller
{
    public function index(Request $request, string $lang): JsonResponse
    {
        $descriptionField = "description_{$lang}";

        $query = Repo::query();

        // Sorting
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            default: // newest
                $query->orderBy('created_at', 'desc');
                break;
        }

        $perPage = $request->input('per_page', 12);
        $paginated = $query->paginate($perPage);

        $items = $paginated->getCollection()->map(function (Repo $repo) use ($descriptionField) {
            return [
                'id' => $repo->id,
                'title' => $repo->title,
                'slug' => $repo->slug,
                'description' => $repo->{$descriptionField},
                'imageUrl' => $repo->image_url,
                'images' => $repo->images ?? [],
                'projectUrl' => $repo->project_url,
                'repoUrl' => $repo->repo_url,
                'isPublic' => $repo->is_public,
                'techStack' => $repo->tech_stack ?? [],
                'viewCount' => $repo->view_count,
                'createdAt' => $repo->created_at?->toDateString(),
            ];
        });

        return response()->json([
            'data' => $items,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $lang, string $slug): JsonResponse
    {
        $descriptionField = "description_{$lang}";

        $repo = Repo::where('slug', $slug)->firstOrFail();

        return response()->json([
            'data' => [
                'id' => $repo->id,
                'title' => $repo->title,
                'slug' => $repo->slug,
                'description' => $repo->{$descriptionField},
                'imageUrl' => $repo->image_url,
                'images' => $repo->images ?? [],
                'projectUrl' => $repo->project_url,
                'repoUrl' => $repo->repo_url,
                'isPublic' => $repo->is_public,
                'techStack' => $repo->tech_stack ?? [],
                'viewCount' => $repo->view_count,
                'createdAt' => $repo->created_at?->toDateString(),
            ],
        ]);
    }

    public function incrementViewCount(int $id): JsonResponse
    {
        $repo = Repo::findOrFail($id);
        $repo->increment('view_count');

        return response()->json(['viewCount' => $repo->view_count]);
    }
}
