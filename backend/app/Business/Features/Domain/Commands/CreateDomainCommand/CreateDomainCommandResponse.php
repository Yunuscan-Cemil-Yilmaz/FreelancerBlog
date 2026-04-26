<?php

namespace App\Business\Features\Domain\Commands\CreateDomainCommand;

class CreateDomainCommandResponse
{
    public function __construct(
        public readonly int $id
    ) {}
}