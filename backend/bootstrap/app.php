<?php

use App\Http\Middleware\SetCurrentDomain;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'set.current.domain' => SetCurrentDomain::class,
        ]);

        $middleware->prependToGroup('api', \App\Http\Middleware\GlobalErrorHandlerMiddleware::class);
        $middleware->prependToGroup('web', \App\Http\Middleware\GlobalErrorHandlerMiddleware::class);
        
        $middleware->prependToGroup('api', SetCurrentDomain::class);
        $middleware->prependToGroup('web', SetCurrentDomain::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
