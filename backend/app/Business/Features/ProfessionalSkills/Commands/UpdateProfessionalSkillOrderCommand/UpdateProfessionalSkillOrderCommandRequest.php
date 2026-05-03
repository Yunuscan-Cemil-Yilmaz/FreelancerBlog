<?php

namespace App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillOrderCommand;

class UpdateProfessionalSkillOrderCommandRequest
{
    public function __construct(
        public array $orders
    ) {
    }
}