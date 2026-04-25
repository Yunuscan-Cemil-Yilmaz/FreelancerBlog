<?php

namespace App\Business\Features\Admin\Services\CheckAdminToken;

use App\Models\AdminToken;

class CheckAdminToken
{
    public function handle($adminId, $token)
    {
        $adminToken = AdminToken::where('admin_id', $adminId)->where('token', $token)->first();

        if (!$adminToken) {
            throw new \Illuminate\Auth\AuthenticationException('Invalid credentials');
        }

        if ($adminToken->expires_at < now()) {
            throw new \Illuminate\Auth\AuthenticationException('Invalid credentials');
        }

        return true;
    }
}