<?php

namespace App\Business\Features\Skills\Commands\UpdateSkillCommand;

class UpdateSkillCommandRequest
{
    public function __construct(
        public int $id,
        public string $category_en,
        public string $category_tr,
        public array $items,
    ) {
    }
}
