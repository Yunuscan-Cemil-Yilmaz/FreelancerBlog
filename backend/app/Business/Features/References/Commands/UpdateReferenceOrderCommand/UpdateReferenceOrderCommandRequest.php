<?php

namespace App\Business\Features\References\Commands\UpdateReferenceOrderCommand;

class UpdateReferenceOrderCommandRequest
{
    public function __construct(
        public array $orders
    ) {
    }
}