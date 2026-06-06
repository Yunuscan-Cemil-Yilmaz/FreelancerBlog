<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UpdateRepoInteractionDetailCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'id' => 'required|integer',
            'interaction_note' => 'required|string'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
