<?php

namespace App\Business\Features\Experiances\Queries\GetExperianceListQuery;

use App\Models\Experiance;

class GetExperianceListQuery
{
    public function handle(GetExperianceListRequest $request): array
    {
        $lang = $request->lang;
        
        $experiances = Experiance::orderBy('order')->get();

        return [
            'data' => $experiances->map(function (Experiance $exp) use ($lang) {
                return [
                    'id' => $exp->id,
                    'year' => $lang === 'en' ? $exp->year_en : $exp->year_tr,
                    'role' => $lang === 'en' ? $exp->role_en : $exp->role_tr,
                    'company' => $lang === 'en' ? $exp->company_en : $exp->company_tr,
                    'description' => $lang === 'en' ? $exp->description_en : $exp->description_tr,
                    'order' => $exp->order,
                    'details' => [
                        'year_en' => $exp->year_en,
                        'year_tr' => $exp->year_tr,
                        'role_en' => $exp->role_en,
                        'role_tr' => $exp->role_tr,
                        'company_en' => $exp->company_en,
                        'company_tr' => $exp->company_tr,
                        'description_en' => $exp->description_en,
                        'description_tr' => $exp->description_tr,
                    ]
                ];
            })
        ];
    }
}
