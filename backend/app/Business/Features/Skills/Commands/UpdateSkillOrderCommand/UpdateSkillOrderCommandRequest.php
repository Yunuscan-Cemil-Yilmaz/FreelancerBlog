<?php

namespace App\Business\Features\Skills\Commands\UpdateSkillOrderCommand;

class UpdateSkillOrderCommandRequest
{
    public function __construct(
        public array $orders
    ) {
    }
}