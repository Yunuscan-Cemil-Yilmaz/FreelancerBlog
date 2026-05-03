<?php

namespace App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery;

readonly class GetRepoListWithPaginationRequest
{
    public function __construct(
        public string $lang,
        public string $sort = 'newest',
        public int $perPage = 12,
        public int $page = 1
    ) {
    }
}
