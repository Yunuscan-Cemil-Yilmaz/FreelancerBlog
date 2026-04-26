<?php

namespace App\Business\Features\Domain\Commands\CreateDomainCommand;

class CreateDomainCommandRequest
{
    public function __construct(
        public readonly string $domain,
        public readonly string $admin_domain
    ) {}
}