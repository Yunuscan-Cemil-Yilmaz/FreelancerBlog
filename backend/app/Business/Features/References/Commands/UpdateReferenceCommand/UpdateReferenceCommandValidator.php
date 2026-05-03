<?php

namespace App\Business\Features\References\Commands\UpdateReferenceCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateReferenceCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:references,id',
            'name' => 'required|string|max:255',
            'role_en' => 'required|string|max:255',
            'role_tr' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'quote_en' => 'required|string',
            'quote_tr' => 'required|string',
        ]);
    }
}
