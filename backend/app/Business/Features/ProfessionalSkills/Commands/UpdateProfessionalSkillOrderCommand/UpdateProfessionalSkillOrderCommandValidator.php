<?php

namespace App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillOrderCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateProfessionalSkillOrderCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:professional_skills,id',
            'orders.*.order' => 'required|integer|min:1',
        ]);
    }
}