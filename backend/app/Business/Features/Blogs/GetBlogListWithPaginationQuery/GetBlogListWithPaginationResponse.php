<?php

namespace App\Business\Features\Blogs\GetBlogListWithPaginationQuery;

readonly class GetBlogListWithPaginationResponse
{
    public function __construct(
        public array $items,
        public array $meta
    ) {
    }
}
