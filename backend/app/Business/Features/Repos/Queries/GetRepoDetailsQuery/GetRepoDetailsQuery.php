<?php

namespace App\Business\Features\Repos\Queries\GetRepoDetailsQuery;

use App\Models\Repo;

class GetRepoDetailsQuery
{
    public function handle(int $id): array
    {
        $repo = Repo::findOrFail($id);

        return [
            'success' => true,
            'data' => $repo
        ];
    }
}
