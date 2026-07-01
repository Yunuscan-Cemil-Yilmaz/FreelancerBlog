<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateRepoInteractionRequestAdminNoteCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:repo_interaction_requests,id',
            'admin_note' => 'nullable|string'
        ]);
    }
}