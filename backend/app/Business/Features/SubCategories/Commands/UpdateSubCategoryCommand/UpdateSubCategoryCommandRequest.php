<?php

namespace App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand;

class UpdateSubCategoryCommandRequest
{
    public function __construct(
        public int $id,
        public int $category_id,
        public string $name_en,
        public string $name_tr,
        public string $slug,
    ) {
    }
}
