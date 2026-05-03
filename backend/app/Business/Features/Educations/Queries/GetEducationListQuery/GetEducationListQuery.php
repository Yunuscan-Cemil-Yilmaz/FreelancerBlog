<?php

namespace App\Business\Features\Educations\Queries\GetEducationListQuery;

use App\Models\Education;

class GetEducationListQuery
{
    public function handle(GetEducationListRequest $request): array
    {
        $lang = $request->lang;
        
        $educations = Education::orderBy('order')->get();

        return [
            'data' => $educations->map(function (Education $edu) use ($lang) {
                return [
                    'id' => $edu->id,
                    'year' => $lang === 'en' ? $edu->year_en : $edu->year_tr,
                    'degree' => $lang === 'en' ? $edu->degree_en : $edu->degree_tr,
                    'school' => $lang === 'en' ? $edu->school_en : $edu->school_tr,
                    'description' => $lang === 'en' ? $edu->description_en : $edu->description_tr,
                    'order' => $edu->order,
                    'details' => [
                        'year_en' => $edu->year_en,
                        'year_tr' => $edu->year_tr,
                        'degree_en' => $edu->degree_en,
                        'degree_tr' => $edu->degree_tr,
                        'school_en' => $edu->school_en,
                        'school_tr' => $edu->school_tr,
                        'description_en' => $edu->description_en,
                        'description_tr' => $edu->description_tr,
                    ]
                ];
            })
        ];
    }
}
