<?php

namespace Infrastructure\Extensions;

use Illuminate\Contracts\Support\Responsable;

abstract class BaseResponse implements Responsable
{
    public function __construct(
        public string $message
    ) {
    }

    public function toResponse($request)
    {
        return response()->json($this);
    }
}