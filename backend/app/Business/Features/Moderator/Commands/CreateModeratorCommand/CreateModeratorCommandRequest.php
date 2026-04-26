<?php

namespace App\Business\Features\Moderator\Commands\CreateModeratorCommand;

class CreateModeratorCommandRequest
{
    public function __construct(
        public string $username,
        public string $password,
        public string $full_name,
        public int $domain_id
    ) {
    }
}
