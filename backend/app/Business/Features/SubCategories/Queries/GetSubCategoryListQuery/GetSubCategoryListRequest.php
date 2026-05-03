<?php

namespace App\Business\Features\SubCategories\Queries\GetSubCategoryListQuery;

class GetSubCategoryListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
