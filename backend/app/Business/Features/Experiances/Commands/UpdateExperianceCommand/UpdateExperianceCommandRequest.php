<?php

namespace App\Business\Features\Experiances\Commands\UpdateExperianceCommand;

class UpdateExperianceCommandRequest
{
    public function __construct(
        public int $id,
        public string $year_en,
        public string $year_tr,
        public string $role_en,
        public string $role_tr,
        public string $company_en,
        public string $company_tr,
        public string $description_en,
        public string $description_tr,
        public int $order
    ) {
    }
}
