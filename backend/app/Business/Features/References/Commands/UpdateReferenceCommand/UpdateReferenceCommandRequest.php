<?php

namespace App\Business\Features\References\Commands\UpdateReferenceCommand;

class UpdateReferenceCommandRequest
{
    public function __construct(
        public int $id,
        public string $name,
        public string $role_en,
        public string $role_tr,
        public string $company,
        public string $quote_en,
        public string $quote_tr,
    ) {
    }
}
