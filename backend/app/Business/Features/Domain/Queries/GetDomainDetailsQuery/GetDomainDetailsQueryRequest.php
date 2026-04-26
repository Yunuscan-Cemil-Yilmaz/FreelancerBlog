<?php

namespace App\Business\Features\Domain\Queries\GetDomainDetailsQuery;

class GetDomainDetailsQueryRequest
{
    public function __construct(
        public readonly int $id
    ) {}
}
