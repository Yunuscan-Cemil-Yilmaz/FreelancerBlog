<?php

namespace App\Business\Features\Skills\Queries\GetSkillListQuery;

use App\Models\Tech;

class GetSkillListQuery
{
    public function handle(GetSkillListRequest $request): array
    {
        $lang = $request->lang;
        
        $techs = Tech::orderBy('order')->get();

        return [
            'data' => $techs->map(function (Tech $tech) use ($lang) {
                return [
                    'id' => $tech->id,
                    'category' => $lang === 'en' ? $tech->category_en : $tech->category_tr,
                    'items' => $tech->items,
                    'order' => $tech->order,
                    'details' => [
                        'category_en' => $tech->category_en,
                        'category_tr' => $tech->category_tr,
                        'items' => $tech->items,
                    ]
                ];
            })
        ];
    }
}
