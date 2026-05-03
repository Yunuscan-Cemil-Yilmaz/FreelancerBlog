<?php

namespace App\Business\Features\ProfessionalSkills\Commands\CreateProfessionalSkillCommand;

use Infrastructure\Extensions\BaseValidator;

use App\Enums\SkillLevel;
use Illuminate\Validation\Rule;

class CreateProfessionalSkillCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'level' => ['required', Rule::enum(SkillLevel::class)],
            'request_domain' => 'required|string',
        ]);
    }
}
