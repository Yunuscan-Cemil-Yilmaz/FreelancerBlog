<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateRepoInteractionDetailCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'repo_interaction_id' => 'required|integer',
            'interaction_note' => 'required|string',
            'contact_result' => 'required|integer',
        ]);
    }
}