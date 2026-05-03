<?php

namespace App\Business\Features\Categories\Commands\CreateCategoryCommand;

class CreateCategoryCommandRequest
{
    public function __construct(
        public string $name_en,
        public string $name_tr,
        public string $slug,
        public string $request_domain
    ) {
    }
}
