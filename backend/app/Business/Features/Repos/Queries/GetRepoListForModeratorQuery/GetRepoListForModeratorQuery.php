<?php

namespace App\Business\Features\Repos\Queries\GetRepoListForModeratorQuery;

use App\Models\Repo;

class GetRepoListForModeratorQuery
{
    public function handle(GetRepoListForModeratorRequest $request): array
    {
        $repos = Repo::orderBy('created_at', 'desc')->paginate($request->perPage);
        
        return [
            'data' => $repos->items(),
            'total' => $repos->total(),
            'current_page' => $repos->currentPage(),
            'last_page' => $repos->lastPage()
        ];
    }
}
