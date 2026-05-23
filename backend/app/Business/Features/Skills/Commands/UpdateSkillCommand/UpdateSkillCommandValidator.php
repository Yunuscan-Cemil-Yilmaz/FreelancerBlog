<?php

namespace App\Business\Features\Skills\Commands\UpdateSkillCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateSkillCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:teches,id',
            'category_en' => 'required|string|max:255',
            'category_tr' => 'required|string|max:255',
            'items' => 'required|array',
            'items.*' => 'required|array',
            'items.*.name' => 'required|string|max:255',
            'items.*.level' => 'required|string|max:255',
        ]);
    }
}
