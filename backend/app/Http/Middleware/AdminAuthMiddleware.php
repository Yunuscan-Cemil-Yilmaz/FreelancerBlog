<?php

namespace App\Http\Middleware;

use App\Business\Features\Admin\Services\CheckAdminToken\CheckAdminToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    private CheckAdminToken $checkAdminToken;

    public function __construct(CheckAdminToken $checkAdminToken)
    {
        $this->checkAdminToken = $checkAdminToken;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $adminId = $request->header('admin-id');
        $token = $request->header('token');

        $this->checkAdminToken->handle($adminId, $token);

        return $next($request);
    }
}
