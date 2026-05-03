<?php

namespace App\Business\Features\Admin\Commands\AdminLogin;

use Infrastructure\Extensions\BaseValidator;

class AdminLoginValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
    }
}
