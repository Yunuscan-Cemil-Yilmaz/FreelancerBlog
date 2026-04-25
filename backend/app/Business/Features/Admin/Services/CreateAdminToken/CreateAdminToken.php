<?php

namespace App\Business\Features\Admin\Services\CreateAdminToken;

use App\Models\Admin;
use App\Models\AdminToken;
use Carbon\Carbon;

class CreateAdminToken
{
    public function handle($adminId)
    {
        $token = bin2hex(random_bytes(32));

        $adminToken = AdminToken::create([
            'admin_id' => $adminId,
            'token' => $token,
        ]);

        return [
            'token' => $adminToken->token,
            'expires_at' => $adminToken->expires_at,
        ];
    }
}