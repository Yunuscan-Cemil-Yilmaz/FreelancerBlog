<?php

namespace App\Business\Features\Domain\Queries\GetDomainWithPaginationQuery;

class GetDomainWithPaginationQueryRequest
{
    public function __construct(
        public readonly int $page = 1,
        public readonly int $pageSize = 10,
        public readonly ?string $domain = null,
        public readonly ?string $admin_domain = null,
        public readonly ?string $orderBy = null
    ) {}
}
