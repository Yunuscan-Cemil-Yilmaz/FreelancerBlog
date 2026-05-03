<?php

namespace App\Business\Features\ProfessionalSkills\Queries\GetProfessionalSkillListQuery;

class GetProfessionalSkillListRequest
{
    public function __construct(
        public string $lang
    ) {
    }
}
