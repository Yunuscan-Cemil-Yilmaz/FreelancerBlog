<?php

namespace App\Business\Features\Experiances\Queries\GetExperianceListQuery;

class GetExperianceListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
