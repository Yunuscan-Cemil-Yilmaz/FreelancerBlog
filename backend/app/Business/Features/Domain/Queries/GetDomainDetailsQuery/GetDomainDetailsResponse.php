<?php

namespace App\Business\Features\Domain\Queries\GetDomainDetailsQuery;

use Infrastructure\Extensions\BaseResponse;
use App\Models\Domain;

class GetDomainDetailsResponse extends BaseResponse
{
    public function __construct(
        string $message,
        public readonly Domain $data,
        public readonly array $counts,
        public readonly \Illuminate\Database\Eloquent\Collection $moderators
    ) {
        parent::__construct($message);
    }
}
