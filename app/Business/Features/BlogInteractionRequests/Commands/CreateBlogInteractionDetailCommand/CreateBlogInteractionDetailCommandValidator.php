<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateBlogInteractionDetailCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'blog_interaction_id' => 'required|integer',
            'interaction_note' => 'required|string',
            'contact_result' => 'required|integer',
        ]);
    }
}