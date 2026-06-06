<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateInteractionRequestAdminNoteCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:interaction_requests,id',
            'admin_note' => 'nullable|string'
        ]);
    }
}
