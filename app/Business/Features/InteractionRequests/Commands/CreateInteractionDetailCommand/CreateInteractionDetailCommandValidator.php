<?php
namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateInteractionDetailCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'interaction_id' => 'required|integer',
            'interaction_note' => 'required|string',
            'contact_result' => 'required|integer',
        ]);
    }
}