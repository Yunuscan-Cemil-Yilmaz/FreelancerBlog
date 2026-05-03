<?php

namespace App\Business\Features\Educations\Queries\GetEducationListQuery;

class GetEducationListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
