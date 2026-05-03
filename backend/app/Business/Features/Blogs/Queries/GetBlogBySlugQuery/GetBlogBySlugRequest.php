<?php

namespace App\Business\Features\Blogs\Queries\GetBlogBySlugQuery;

readonly class GetBlogBySlugRequest
{
    public function __construct(
        public string $lang,
        public string $slug
    ) {
    }
}
