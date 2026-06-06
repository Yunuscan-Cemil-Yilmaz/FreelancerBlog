<?php

namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateInteractionDetailCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'interaction_id' => 'required|integer',
            'interaction_note' => 'required|string'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
