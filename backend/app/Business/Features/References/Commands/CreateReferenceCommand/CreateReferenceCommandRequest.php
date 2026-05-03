<?php

namespace App\Business\Features\References\Commands\CreateReferenceCommand;

class CreateReferenceCommandRequest
{
    public function __construct(
        public string $name,
        public string $role_en,
        public string $role_tr,
        public string $company,
        public string $quote_en,
        public string $quote_tr,
        public string $request_domain
    ) {
    }
}
