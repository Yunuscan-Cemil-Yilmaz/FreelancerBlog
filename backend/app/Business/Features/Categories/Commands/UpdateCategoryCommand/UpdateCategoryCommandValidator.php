<?php

namespace App\Business\Features\Categories\Commands\UpdateCategoryCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateCategoryCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:categories,id',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . ($data['id'] ?? 'NULL'),
        ]);
    }
}
