<?php

namespace App\Http\Middleware;

use App\Business\Features\Moderator\Services\CheckModeratorToken\CheckModeratorToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ModeratorAuthMiddleware
{
    private CheckModeratorToken $checkModeratorToken;

    public function __construct(CheckModeratorToken $checkModeratorToken)
    {
        $this->checkModeratorToken = $checkModeratorToken;
    }
    public function handle(Request $request, Closure $next): Response
    {
        $moderatorId = $request->header('moderator-id');
        $token = $request->header('token');

        $this->checkModeratorToken->handle($moderatorId, $token);
        return $next($request);
    }
}
