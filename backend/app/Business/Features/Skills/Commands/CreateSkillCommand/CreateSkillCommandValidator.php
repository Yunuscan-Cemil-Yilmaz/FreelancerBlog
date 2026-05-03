<?php

namespace App\Business\Features\Skills\Commands\CreateSkillCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateSkillCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'category_en' => 'required|string|max:255',
            'category_tr' => 'required|string|max:255',
            'items' => 'required|array',
            'items.*' => 'required|string|max:255',
            'request_domain' => 'required|string',
        ]);
    }
}
