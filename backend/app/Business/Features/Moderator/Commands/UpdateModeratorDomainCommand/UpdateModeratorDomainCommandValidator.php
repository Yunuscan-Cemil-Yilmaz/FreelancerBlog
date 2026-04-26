<?php

namespace App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UpdateModeratorDomainCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:moderators,id',
            'domain_id' => 'required|integer|exists:domains,id',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
