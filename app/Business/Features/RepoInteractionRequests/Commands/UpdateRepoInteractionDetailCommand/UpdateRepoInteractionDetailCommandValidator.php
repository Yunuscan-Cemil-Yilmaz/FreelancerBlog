<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateRepoInteractionDetailCommandValidator extends BaseValidator
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