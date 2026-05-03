<?php

namespace App\Business\Features\Skills\Commands\UpdateSkillOrderCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateSkillOrderCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:techs,id',
            'orders.*.order' => 'required|integer|min:1',
        ]);
    }
}