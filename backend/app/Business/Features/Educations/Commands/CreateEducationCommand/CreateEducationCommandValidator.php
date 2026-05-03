<?php

namespace App\Business\Features\Educations\Commands\CreateEducationCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateEducationCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'year_en' => 'required|string|max:255',
            'year_tr' => 'required|string|max:255',
            'degree_en' => 'required|string|max:255',
            'degree_tr' => 'required|string|max:255',
            'school_en' => 'required|string|max:255',
            'school_tr' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'request_domain' => 'required|string',
        ]);
    }
}
