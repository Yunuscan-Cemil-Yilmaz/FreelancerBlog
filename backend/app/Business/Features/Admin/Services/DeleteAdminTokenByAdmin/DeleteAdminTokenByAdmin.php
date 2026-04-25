<?php

namespace App\Business\Features\Admin\Services\DeleteAdminTokenByAdmin;

use App\Models\AdminToken;

class DeleteAdminTokenByAdmin
{
    public function handle($adminId): void
    {
        AdminToken::where('admin_id', $adminId)->delete();
    }
}