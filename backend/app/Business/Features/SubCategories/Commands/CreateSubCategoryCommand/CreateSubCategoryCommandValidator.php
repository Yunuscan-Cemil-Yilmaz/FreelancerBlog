<?php

namespace App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateSubCategoryCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'category_id' => 'required|integer|exists:categories,id',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:sub_categories,slug',
            'request_domain' => 'required|string',
        ]);
    }
}
