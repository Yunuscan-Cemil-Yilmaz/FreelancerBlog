<?php

namespace App\Business\Features\Admin\Commands\AdminLogout;

use App\Business\Features\Admin\Services\DeleteAdminTokenByToken\DeleteAdminTokenByToken;

class AdminLogout
{
    private DeleteAdminTokenByToken $deleteAdminTokenByToken;

    public function __construct(DeleteAdminTokenByToken $deleteAdminTokenByToken) {
        $this->deleteAdminTokenByToken = $deleteAdminTokenByToken;
    }
    public function handle($adminId, $token)
    {
        $this->deleteAdminTokenByToken->handle($adminId, $token);

        return response()->json([
            'message' => 'Admin logout successful',
        ]);
    }
}