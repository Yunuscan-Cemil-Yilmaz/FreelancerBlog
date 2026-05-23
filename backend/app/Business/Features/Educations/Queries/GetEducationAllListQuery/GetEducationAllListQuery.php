<?php

namespace App\Business\Features\Educations\Queries\GetEducationAllListQuery;

use App\Models\Education;

class GetEducationAllListQuery
{
    public function handle(): array
    {
        $educations = Education::orderBy('order')->get();

        $data = $educations->map(function (Education $edu) {
            return [
                'id' => $edu->id,
                'year_en' => $edu->year_en,
                'year_tr' => $edu->year_tr,
                'degree_en' => $edu->degree_en,
                'degree_tr' => $edu->degree_tr,
                'school_en' => $edu->school_en,
                'school_tr' => $edu->school_tr,
                'description_en' => $edu->description_en,
                'description_tr' => $edu->description_tr,
                'order' => $edu->order,
            ];
        });

        return ['data' => $data];
    }
}
