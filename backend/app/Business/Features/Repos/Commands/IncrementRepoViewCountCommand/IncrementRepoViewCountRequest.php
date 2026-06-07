<?php

namespace App\Business\Features\Repos\Commands\IncrementRepoViewCountCommand;

readonly class IncrementRepoViewCountRequest
{
    public function __construct(
        public int $id,
        public string $ip,
        public string $userAgent
    ) {
    }
}
