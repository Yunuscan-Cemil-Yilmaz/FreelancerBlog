<?php

namespace App\Business\Features\Repos\Commands\Commands\IncrementRepoViewCountCommand;

readonly class IncrementRepoViewCountRequest
{
    public function __construct(
        public int $id
    ) {
    }
}
