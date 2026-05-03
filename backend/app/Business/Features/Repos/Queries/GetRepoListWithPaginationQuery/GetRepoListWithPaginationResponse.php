<?php

namespace App\Business\Features\Repos\Queries\GetRepoListWithPaginationQuery;

readonly class GetRepoListWithPaginationResponse
{
    public function __construct(
        public array $items,
        public array $meta
    ) {
    }
}
