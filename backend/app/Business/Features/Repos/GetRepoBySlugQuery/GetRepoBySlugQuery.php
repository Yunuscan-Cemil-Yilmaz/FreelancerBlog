<?php

namespace App\Business\Features\Repos\GetRepoBySlugQuery;

use App\Models\Repo;

class GetRepoBySlugQuery
{
    public function handle(GetRepoBySlugRequest $request): array
    {
        $lang = $request->lang;
        $descriptionField = "description_{$lang}";

        $repo = Repo::where('slug', $request->slug)->firstOrFail();

        return [
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
        ];
    }
}
