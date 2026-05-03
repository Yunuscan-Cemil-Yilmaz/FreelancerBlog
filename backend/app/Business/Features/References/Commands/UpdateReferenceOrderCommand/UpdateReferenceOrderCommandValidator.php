<?php

namespace App\Business\Features\References\Commands\UpdateReferenceOrderCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateReferenceOrderCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:references,id',
            'orders.*.order' => 'required|integer|min:1',
        ]);
    }
}