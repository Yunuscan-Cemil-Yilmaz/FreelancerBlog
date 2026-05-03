<?php

namespace App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateSubCategoryCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:sub_categories,id',
            'category_id' => 'required|integer|exists:categories,id',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:sub_categories,slug,' . ($data['id'] ?? 'NULL'),
        ]);
    }
}
