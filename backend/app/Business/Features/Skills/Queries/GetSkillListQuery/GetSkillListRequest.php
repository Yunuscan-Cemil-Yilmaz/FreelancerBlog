<?php

namespace App\Business\Features\Skills\Queries\GetSkillListQuery;

class GetSkillListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
