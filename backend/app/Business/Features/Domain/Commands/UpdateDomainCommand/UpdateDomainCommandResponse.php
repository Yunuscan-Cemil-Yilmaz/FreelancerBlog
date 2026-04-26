<?php

namespace App\Business\Features\Domain\Commands\UpdateDomainCommand;

use App\Models\Domain;

class UpdateDomainCommandResponse
{
    public function __construct(
        public readonly int $id,
        public readonly string $domain,
        public readonly string $admin_domain
    ) {}
}