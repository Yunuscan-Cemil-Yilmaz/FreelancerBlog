<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateBlogInteractionDetailCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'blog_interaction_id' => 'required|integer',
            'interaction_note' => 'required|string'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
