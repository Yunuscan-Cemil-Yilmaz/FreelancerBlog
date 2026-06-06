<?php

namespace App\Business\Features\Blogs\Queries\GetBlogListForModeratorQuery;

class GetBlogListForModeratorRequest
{
    public function __construct(
        public readonly int $perPage = 10
    ) {
    }
}
