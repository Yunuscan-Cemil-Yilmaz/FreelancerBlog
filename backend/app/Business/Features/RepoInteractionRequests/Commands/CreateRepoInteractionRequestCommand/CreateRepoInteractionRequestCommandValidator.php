<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateRepoInteractionRequestCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'repo_id' => 'required|integer|exists:repos,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'interaction_type' => 'required|string|max:255',
            'title' => 'required|string',
            'message' => 'required|string',
            'preferred_contact_time' => 'nullable|string',
            'kvkk_approved' => 'required|boolean',
        ]);
    }
}
