<?php

namespace App\Business\Features\Educations\Commands\UpdateEducationCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateEducationCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:educations,id',
            'year_en' => 'required|string|max:255',
            'year_tr' => 'required|string|max:255',
            'degree_en' => 'required|string|max:255',
            'degree_tr' => 'required|string|max:255',
            'school_en' => 'required|string|max:255',
            'school_tr' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
        ]);
    }
}
