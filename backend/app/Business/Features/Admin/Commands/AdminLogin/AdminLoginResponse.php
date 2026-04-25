<?php

namespace App\Business\Features\Admin\Commands\AdminLogin;

use App\Models\Admin;
use Infrastructure\Extensions\BaseResponse;

class AdminLoginResponse extends BaseResponse
{
    public function __construct(
        string $message,
        public string $token,
        public string $expiresAt,
        public Admin $admin
    ) {
        parent::__construct($message);
    }
}