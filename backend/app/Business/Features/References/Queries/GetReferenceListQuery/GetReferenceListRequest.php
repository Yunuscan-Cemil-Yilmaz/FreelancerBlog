<?php

namespace App\Business\Features\References\Queries\GetReferenceListQuery;

class GetReferenceListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
