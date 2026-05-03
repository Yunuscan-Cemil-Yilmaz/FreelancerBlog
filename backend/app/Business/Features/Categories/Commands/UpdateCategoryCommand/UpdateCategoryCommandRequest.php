<?php

namespace App\Business\Features\Categories\Commands\UpdateCategoryCommand;

class UpdateCategoryCommandRequest
{
    public function __construct(
        public int $id,
        public string $name_en,
        public string $name_tr,
        public string $slug
    ) {
    }
}
