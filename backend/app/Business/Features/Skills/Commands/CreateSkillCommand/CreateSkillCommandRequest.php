<?php

namespace App\Business\Features\Skills\Commands\CreateSkillCommand;

class CreateSkillCommandRequest
{
    public function __construct(
        public string $category_en,
        public string $category_tr,
        public array $items,
        public string $request_domain
    ) {
    }
}
