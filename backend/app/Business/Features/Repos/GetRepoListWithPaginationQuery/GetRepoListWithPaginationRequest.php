<?php

namespace App\Business\Features\Repos\GetRepoListWithPaginationQuery;

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
