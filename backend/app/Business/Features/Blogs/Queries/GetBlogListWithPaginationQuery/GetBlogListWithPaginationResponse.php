<?php

namespace App\Business\Features\Blogs\Queries\GetBlogListWithPaginationQuery;

readonly class GetBlogListWithPaginationResponse
{
    public function __construct(
        public array $items,
        public array $meta
    ) {
    }
}
