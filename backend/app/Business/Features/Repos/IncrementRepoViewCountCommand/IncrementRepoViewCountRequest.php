<?php

namespace App\Business\Features\Repos\IncrementRepoViewCountCommand;

readonly class IncrementRepoViewCountRequest
{
    public function __construct(
        public int $id
    ) {
    }
}
