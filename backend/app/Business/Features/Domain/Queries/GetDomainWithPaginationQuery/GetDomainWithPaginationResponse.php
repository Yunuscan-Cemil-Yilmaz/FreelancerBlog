<?php

namespace App\Business\Features\Domain\Queries\GetDomainWithPaginationQuery;

use Infrastructure\Extensions\BaseResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class GetDomainWithPaginationResponse extends BaseResponse
{
    public function __construct(
        string $message,
        public readonly LengthAwarePaginator $data
    ) {
        parent::__construct($message);
    }
}
