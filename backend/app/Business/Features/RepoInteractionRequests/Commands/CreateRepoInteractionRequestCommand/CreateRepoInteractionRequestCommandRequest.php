<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand;

class CreateRepoInteractionRequestCommandRequest
{
    public function __construct(
        public int $repo_id,
        public string $name,
        public ?string $email,
        public ?string $phone,
        public string $interaction_type,
        public string $title,
        public string $message,
        public ?string $preferred_contact_time,
        public bool $kvkk_approved,
        public string $ip_address,
        public ?string $user_agent,
        public string $host
    ) {
    }
}
