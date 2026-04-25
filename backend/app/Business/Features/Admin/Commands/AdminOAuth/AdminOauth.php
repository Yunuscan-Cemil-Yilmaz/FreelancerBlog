<?php

namespace App\Business\Features\Admin\Commands\AdminOAuth;

use App\Business\Features\Admin\Services\CheckAdminToken\CheckAdminToken;

class AdminOauth
{
    private CheckAdminToken $checkAdminToken;

    public function __construct(CheckAdminToken $checkAdminToken) {
        $this->checkAdminToken = $checkAdminToken;
    }
    public function handle($adminId, $token)
    {
        $checkResult = $this->checkAdminToken->handle($adminId, $token);

        if ($checkResult) {
            return response()->json([
                'message' => 'Admin token is valid',
            ]);
        }else {
            throw new \Illuminate\Auth\AuthenticationException('Invalid credentials');
        }
    }
}
