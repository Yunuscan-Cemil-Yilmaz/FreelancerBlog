<?php

namespace App\Business\Features\Educations\Commands\UpdateEducationOrderCommand;

class UpdateEducationOrderCommandRequest
{
    public function __construct(
        public array $orders
    ) {
    }
}