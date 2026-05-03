<?php

namespace App\Business\Features\Repos\Queries\Queries\GetRepoBySlugQuery;

readonly class GetRepoBySlugRequest
{
    public function __construct(
        public string $lang,
        public string $slug
    ) {
    }
}
