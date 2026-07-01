<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateBlogInteractionRequestAdminNoteCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:blog_interaction_requests,id',
            'admin_note' => 'nullable|string'
        ]);
    }
}