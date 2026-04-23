<?php

namespace App\Business\Features\Blogs\GetBlogBySlugQuery;

readonly class GetBlogBySlugResponse
{
    public function __construct(
        public array $data
    ) {
    }
}
