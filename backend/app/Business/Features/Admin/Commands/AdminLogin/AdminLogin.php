<?php

namespace App\Business\Features\Admin\Commands\AdminLogin;

use App\Models\Admin;
use App\Business\Features\Admin\Services\CreateAdminToken\CreateAdminToken;
use App\Business\Features\Admin\Services\DeleteAdminTokenByAdmin\DeleteAdminTokenByAdmin;
use Illuminate\Support\Facades\Hash;

class AdminLogin
{
    private CreateAdminToken $createAdminToken;

    private DeleteAdminTokenByAdmin $deleteAdminTokenByAdmin;

    public function __construct(
        CreateAdminToken $createAdminToken,
        DeleteAdminTokenByAdmin $deleteAdminTokenByAdmin
        )
    {
        $this->createAdminToken = $createAdminToken;
        $this->deleteAdminTokenByAdmin = $deleteAdminTokenByAdmin;
    }

    public function handle(AdminLoginRequest $request): AdminLoginResponse
    {
        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw new \Illuminate\Auth\AuthenticationException('Invalid credentials');
        }

        $this->deleteAdminTokenByAdmin->handle($admin->id);

        $tokenData = $this->createAdminToken->handle($admin->id);

        return new AdminLoginResponse(
            message: 'Admin login successful',
            token: $tokenData['token'],
            expiresAt: $tokenData['expires_at']->toIso8601String(),
            admin: $admin
        );
    }
}
