<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionDetailCommand;

class UpdateBlogInteractionDetailCommandRequest
{
    public function __construct(
        public int $id,
        public string $interaction_note,
        public int $contact_result
    ) {
    }
}