<?php

namespace App\Business\Features\Categories\Commands\CreateCategoryCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateCategoryCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'request_domain' => 'required|string',
        ]);
    }
}
