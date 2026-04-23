<?php

namespace App\Business\Features\Blogs\GetBlogListWithPaginationQuery;

readonly class GetBlogListWithPaginationRequest
{
    public function __construct(
        public string $lang,
        public ?int $categoryId = null,
        public ?int $subCategoryId = null,
        public string $sort = 'newest',
        public int $perPage = 12,
        public int $page = 1
    ) {
    }
}
