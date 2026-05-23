<?php

namespace App\Business\Features\Experiences\Queries\GetExperienceAllListQuery;

use App\Models\Experiance;

class GetExperienceAllListQuery
{
    public function handle(): array
    {
        $experiences = Experiance::orderBy('order')->get();

        $data = $experiences->map(function (Experiance $exp) {
            return [
                'id' => $exp->id,
                'year_en' => $exp->year_en,
                'year_tr' => $exp->year_tr,
                'title_en' => $exp->title_en,
                'title_tr' => $exp->title_tr,
                'company_en' => $exp->company_en,
                'company_tr' => $exp->company_tr,
                'description_en' => $exp->description_en,
                'description_tr' => $exp->description_tr,
                'order' => $exp->order,
            ];
        });

        return ['data' => $data];
    }
}
