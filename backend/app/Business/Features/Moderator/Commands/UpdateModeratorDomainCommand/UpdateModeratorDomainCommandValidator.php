<?php

namespace App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateModeratorDomainCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:moderators,id',
            'domain_id' => 'required|integer|exists:domains,id',
        ]);
    }
}
