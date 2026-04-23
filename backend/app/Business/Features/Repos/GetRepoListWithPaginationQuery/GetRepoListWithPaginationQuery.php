<?php

namespace App\Business\Features\Repos\GetRepoListWithPaginationQuery;

use App\Models\Repo;

class GetRepoListWithPaginationQuery
{
    public function handle(GetRepoListWithPaginationRequest $request): GetRepoListWithPaginationResponse
    {
        $lang = $request->lang;
        $descriptionField = "description_{$lang}";

        $query = Repo::query();

        switch ($request->sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $paginated = $query->paginate($request->perPage, ['*'], 'page', $request->page);

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
        })->toArray();

        return new GetRepoListWithPaginationResponse(
            $items,
            [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ]
        );
    }
}
