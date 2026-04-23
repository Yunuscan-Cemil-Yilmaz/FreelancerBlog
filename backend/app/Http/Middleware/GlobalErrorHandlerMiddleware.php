<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Illuminate\Support\Facades\Log;

class GlobalErrorHandlerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->handleException($e, $request, 422, $e->getMessage(), $e->errors());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->handleException($e, $request, 404, 'Resource not found.');
        } catch (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            return $this->handleException($e, $request, 404, 'Route not found.');
        } catch (\Symfony\Component\HttpKernel\Exception\HttpExceptionInterface $e) {
            return $this->handleException($e, $request, $e->getStatusCode(), $e->getMessage());
        } catch (Throwable $e) {
            return $this->handleException($e, $request, 500, $e->getMessage() ?: 'An unexpected error occurred.');
        }
    }

    private function handleException(Throwable $e, Request $request, int $status, string $message, array $errors = []): Response
    {
        Log::error($e->getMessage(), [
            'exception' => get_class($e),
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'input' => $request->all(),
        ]);

        $response = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        if (config('app.debug')) {
            $response['debug'] = [
                'class' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTrace()[0] ?? null,
            ];
        }

        return response()->json($response, $status);
    }
}
