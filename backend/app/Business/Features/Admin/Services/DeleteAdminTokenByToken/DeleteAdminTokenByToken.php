<?php

namespace App\Business\Features\Admin\Services\DeleteAdminTokenByToken;

use App\Models\AdminToken;

class DeleteAdminTokenByToken
{
    public function handle($adminId, $token): void
    {
        AdminToken::where('admin_id', $adminId)->where('token', $token)->delete();
    }
}