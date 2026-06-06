<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand;

class CreateBlogInteractionDetailCommandRequest
{
    public function __construct(
        public int $blog_interaction_id,
        public string $interaction_note,
        public ?int $contact_result = null,
        public ?string $host = null
    ) {}
}
