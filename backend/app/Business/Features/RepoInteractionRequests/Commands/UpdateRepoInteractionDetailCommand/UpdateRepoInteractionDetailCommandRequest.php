<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionDetailCommand;

class UpdateRepoInteractionDetailCommandRequest
{
    public function __construct(
        public int $id,
        public string $interaction_note,
        public ?int $contact_result = null
    ) {}
}
