<?php

namespace App\Business\Features\Blogs\GetBlogBySlugQuery;

readonly class GetBlogBySlugRequest
{
    public function __construct(
        public string $lang,
        public string $slug
    ) {
    }
}
