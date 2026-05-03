<?php

namespace App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand;

class CreateSubCategoryCommandRequest
{
    public function __construct(
        public int $category_id,
        public string $name_en,
        public string $name_tr,
        public string $slug,
        public string $request_domain
    ) {
    }
}
