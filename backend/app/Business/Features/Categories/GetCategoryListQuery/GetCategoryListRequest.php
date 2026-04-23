<?php

namespace App\Business\Features\Categories\GetCategoryListQuery;

readonly class GetCategoryListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
