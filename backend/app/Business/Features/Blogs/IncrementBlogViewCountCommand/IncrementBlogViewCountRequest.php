<?php

namespace App\Business\Features\Blogs\IncrementBlogViewCountCommand;

readonly class IncrementBlogViewCountRequest
{
    public function __construct(
        public int $id
    ) {
    }
}
