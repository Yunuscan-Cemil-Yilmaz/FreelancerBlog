<?php

namespace App\Business\Features\Skills\Queries\GetSkillAllListQuery;

use App\Models\Tech;

class GetSkillAllListQuery
{
    public function handle(): array
    {
        $skills = Tech::get();

        $data = $skills->map(function (Tech $skill) {
            return [
                'id' => $skill->id,
                'category_en' => $skill->category_en,
                'category_tr' => $skill->category_tr,
                'items' => $skill->items,
            ];
        });

        return ['data' => $data];
    }
}
