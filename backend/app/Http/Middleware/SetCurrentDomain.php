<?php

namespace App\Http\Middleware;

use App\Support\CurrentDomain;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetCurrentDomain
{
    public function __construct(
        private CurrentDomain $currentDomain
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $this->currentDomain->set($request->getHost());

        return $next($request);
    }
}
