<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogin;

class ModeratorLoginRequest
{
    public function __construct(
        public string $username,
        public string $password
    ) {
    }
}
