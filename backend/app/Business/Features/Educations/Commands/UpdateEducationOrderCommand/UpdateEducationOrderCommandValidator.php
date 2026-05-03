<?php

namespace App\Business\Features\Educations\Commands\UpdateEducationOrderCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateEducationOrderCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:educations,id',
            'orders.*.order' => 'required|integer|min:1',
        ]);
    }
}