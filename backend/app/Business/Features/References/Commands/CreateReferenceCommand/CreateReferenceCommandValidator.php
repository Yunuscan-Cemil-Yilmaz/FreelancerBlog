<?php

namespace App\Business\Features\References\Commands\CreateReferenceCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateReferenceCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'name' => 'required|string|max:255',
            'role_en' => 'required|string|max:255',
            'role_tr' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'quote_en' => 'required|string',
            'quote_tr' => 'required|string',
            'request_domain' => 'required|string',
        ]);
    }
}
