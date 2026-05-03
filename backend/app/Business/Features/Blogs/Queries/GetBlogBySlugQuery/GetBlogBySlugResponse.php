<?php

namespace App\Business\Features\Blogs\Queries\GetBlogBySlugQuery;

readonly class GetBlogBySlugResponse
{
    public function __construct(
        public array $data
    ) {
    }
}
