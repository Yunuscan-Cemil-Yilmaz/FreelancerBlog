<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionRequestCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateBlogInteractionRequestCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'blog_id' => 'required|integer|exists:blogs,id',
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
