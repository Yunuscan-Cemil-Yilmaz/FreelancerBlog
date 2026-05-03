<?php

namespace App\Business\Features\Educations\Commands\CreateEducationCommand;

class CreateEducationCommandRequest
{
    public function __construct(
        public string $year_en,
        public string $year_tr,
        public string $degree_en,
        public string $degree_tr,
        public string $school_en,
        public string $school_tr,
        public string $description_en,
        public string $description_tr,
        public string $request_domain
    ) {
    }
}
