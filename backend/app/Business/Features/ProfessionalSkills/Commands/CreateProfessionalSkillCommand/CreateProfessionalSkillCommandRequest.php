<?php

namespace App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand;

class CreateProfessionalSkillCommandRequest
{
    public function __construct(
        public string $name_en,
        public string $name_tr,
        public string $icon,
        public string $level,
        public string $request_domain
    ) {
    }
}
