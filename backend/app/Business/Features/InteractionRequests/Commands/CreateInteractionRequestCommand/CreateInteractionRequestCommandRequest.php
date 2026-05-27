<?php

namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionRequestCommand;

class CreateInteractionRequestCommandRequest
{
    public function __construct(
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
