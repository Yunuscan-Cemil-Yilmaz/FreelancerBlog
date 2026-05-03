<?php

namespace App\Business\Features\Moderator\Commands\CreateModeratorCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateModeratorCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'username' => 'required|string|unique:moderators,username',
            'password' => 'required|string|min:6',
            'full_name' => 'required|string',
            'domain_id' => 'required|integer|exists:domains,id',
        ]);
    }
}
