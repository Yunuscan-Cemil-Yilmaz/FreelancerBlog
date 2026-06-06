<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand;

class CreateRepoInteractionDetailCommandRequest
{
    public function __construct(
        public int $repo_interaction_id,
        public string $interaction_note,
        public ?int $contact_result = null,
        public ?string $host = null
    ) {}
}
