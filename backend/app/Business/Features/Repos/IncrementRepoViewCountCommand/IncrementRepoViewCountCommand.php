<?php

namespace App\Business\Features\Repos\IncrementRepoViewCountCommand;

use App\Models\Repo;

class IncrementRepoViewCountCommand
{
    public function handle(IncrementRepoViewCountRequest $request): array
    {
        $repo = Repo::findOrFail($request->id);
        $repo->increment('view_count');

        return ['viewCount' => $repo->view_count];
    }
}
