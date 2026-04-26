<?php

namespace App\Business\Features\Domain\Commands\UpdateDomainCommand;

class UpdateDomainCommandRequest
{
    public function __construct(
        public readonly int $id,
        public readonly string $domain,
        public readonly string $admin_domain
    ) {}
}