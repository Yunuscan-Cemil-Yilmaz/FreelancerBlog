<?php

namespace App\Business\Features\Admin\Commands\AdminLogin;

class AdminLoginRequest
{
    public function __construct(
        public string $username,
        public string $password
    ) {
    }
}