<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateRepoInteractionDetailCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'repo_interaction_id' => 'required|integer',
            'interaction_note' => 'required|string'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
