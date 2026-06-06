<?php

namespace App\Business\Features\Repos\Queries\GetRepoListForModeratorQuery;

class GetRepoListForModeratorRequest
{
    public function __construct(
        public readonly int $perPage = 10
    ) {
    }
}
