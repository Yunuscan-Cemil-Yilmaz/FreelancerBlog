<?php

namespace App\Business\Features\Categories\Queries\GetCategoryListQuery;

readonly class GetCategoryListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
