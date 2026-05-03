<?php

namespace App\Business\Features\Experiances\Commands\UpdateExperienceOrderCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateExperienceOrderCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:experiances,id',
            'orders.*.order' => 'required|integer|min:1',
        ]);
    }
}