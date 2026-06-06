<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class UpdateBlogInteractionDetailCommandValidator extends BaseValidator
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