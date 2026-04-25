<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Business\Features\Admin\Commands\AdminLogin\AdminLogin;
use App\Business\Features\Admin\Commands\AdminLogin\AdminLoginRequest;
use App\Business\Features\Admin\Commands\AdminLogin\AdminLoginResponse;
use App\Business\Features\Admin\Commands\AdminLogin\AdminLoginValidator;
use App\Business\Features\Admin\Commands\AdminOAuth\AdminOauth;
use App\Business\Features\Admin\Commands\AdminLogout\AdminLogout;

class AdminController extends Controller
{
    public function login(Request $request, AdminLogin $adminLogin, AdminLoginValidator $validator): AdminLoginResponse
    {
        $validator->validate($request->all());

        $loginRequest = new AdminLoginRequest(
            username: $request->input('username'),
            password: $request->input('password')
        );

        return $adminLogin->handle($loginRequest);
    }

    public function oauth(Request $request, AdminOauth $adminOauth)
    {
        $adminId = $request->header('admin-id');
        $token = $request->header('token');

        return $adminOauth->handle($adminId, $token);
    }

    public function logout(Request $request, AdminLogout $adminLogout)
    {
        $adminId = $request->header('admin-id');
        $token = $request->header('token');

        return $adminLogout->handle($adminId, $token);
    }
}
