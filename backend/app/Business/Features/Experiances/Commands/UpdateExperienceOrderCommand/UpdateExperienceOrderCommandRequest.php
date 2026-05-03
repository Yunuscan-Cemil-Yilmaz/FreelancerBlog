<?php

namespace App\Business\Features\Experiances\Commands\UpdateExperienceOrderCommand;

class UpdateExperienceOrderCommandRequest
{
    public function __construct(
        public array $orders
    ) {
    }
}