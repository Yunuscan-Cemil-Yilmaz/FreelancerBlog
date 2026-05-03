<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogin;

use Infrastructure\Extensions\BaseValidator;

class ModeratorLoginValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
    }
}
