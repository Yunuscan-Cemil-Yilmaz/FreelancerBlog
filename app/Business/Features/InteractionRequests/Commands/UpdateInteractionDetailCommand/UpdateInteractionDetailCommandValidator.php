<?php
namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateInteractionDetailCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer',
            'interaction_note' => 'required|string',
            'contact_result' => 'required|integer',
        ]);
    }
}