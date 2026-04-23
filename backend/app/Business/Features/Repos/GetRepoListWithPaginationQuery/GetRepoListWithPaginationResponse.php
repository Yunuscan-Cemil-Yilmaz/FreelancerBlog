<?php

namespace App\Business\Features\Repos\GetRepoListWithPaginationQuery;

readonly class GetRepoListWithPaginationResponse
{
    public function __construct(
        public array $items,
        public array $meta
    ) {
    }
}
