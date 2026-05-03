<?php

namespace App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillCommand;

class UpdateProfessionalSkillCommandRequest
{
    public function __construct(
        public int $id,
        public string $name_en,
        public string $name_tr,
        public string $icon,
        public string $level,
    ) {
    }
}
