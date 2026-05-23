<?php

namespace App\Http\Middleware;

use App\Business\Extentions\CurrentDomain\CurrentDomain;
use App\Business\Features\Moderator\Services\CheckModeratorToken\CheckModeratorToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ModeratorAuthMiddleware
{
    private CheckModeratorToken $checkModeratorToken;
    private CurrentDomain $currentDomain;

    public function __construct(CheckModeratorToken $checkModeratorToken, CurrentDomain $currentDomain)
    {
        $this->checkModeratorToken = $checkModeratorToken;
        $this->currentDomain = $currentDomain;
    }
    public function handle(Request $request, Closure $next): Response
    {
        $moderatorId = $request->header('moderator-id');
        $token = $request->header('token');

        $this->checkModeratorToken->handle($moderatorId, $token);

        // Fetch the moderator and inject their domain into the request headers and CurrentDomain
        $moderator = \App\Models\Moderator::find($moderatorId);
        if ($moderator && $moderator->domain) {
            $request->headers->set('domain', $moderator->domain);
            $this->currentDomain->set($moderator->domain);
        }

        return $next($request);
    }
}
