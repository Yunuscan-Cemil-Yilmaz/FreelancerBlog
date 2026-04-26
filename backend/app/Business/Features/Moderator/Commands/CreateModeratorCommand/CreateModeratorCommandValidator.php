<?php

namespace App\Business\Features\Moderator\Commands\CreateModeratorCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateModeratorCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'username' => 'required|string|unique:moderators,username',
            'password' => 'required|string|min:6',
            'full_name' => 'required|string',
            'domain_id' => 'required|integer|exists:domains,id',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
