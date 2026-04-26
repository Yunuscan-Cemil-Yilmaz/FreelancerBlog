<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogin;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ModeratorLoginValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
