<?php

namespace App\Business\Features\Domain\Commands\CascadeUpdateDomainCommand;

class CascadeUpdateDomainCommandRequest
{
    public function __construct(
        public readonly int $id,
        public readonly string $domain,
        public readonly string $admin_domain
    ) {}
}