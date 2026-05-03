<?php

namespace App\Business\Features\Blogs\Commands\IncrementBlogViewCountCommand;

readonly class IncrementBlogViewCountRequest
{
    public function __construct(
        public int $id
    ) {
    }
}
