<?php

namespace App\Business\Features\Repos\GetRepoBySlugQuery;

readonly class GetRepoBySlugRequest
{
    public function __construct(
        public string $lang,
        public string $slug
    ) {
    }
}
