<?php

namespace App\Business\Features\Experiances\Commands\CreateExperianceCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateExperianceCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'year_en' => 'required|string|max:255',
            'year_tr' => 'required|string|max:255',
            'role_en' => 'required|string|max:255',
            'role_tr' => 'required|string|max:255',
            'company_en' => 'required|string|max:255',
            'company_tr' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'order' => 'required|integer',
            'request_domain' => 'required|string',
        ]);
    }
}
