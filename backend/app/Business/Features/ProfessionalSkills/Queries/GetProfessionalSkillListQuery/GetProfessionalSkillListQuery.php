<?php

namespace App\Business\Features\ProfessionalSkills\Queries\GetProfessionalSkillListQuery;

use App\Models\ProfessionalSkill;

class GetProfessionalSkillListQuery
{
    public function handle(GetProfessionalSkillListRequest $request): array
    {
        $lang = $request->lang;
        
        $skills = ProfessionalSkill::orderBy('order')->get();

        return [
            'data' => $skills->map(function (ProfessionalSkill $skill) use ($lang) {
                return [
                    'id' => $skill->id,
                    'name' => $lang === 'en' ? $skill->name_en : $skill->name_tr,
                    'icon' => $skill->icon,
                    'level' => $skill->level->value,
                    'order' => $skill->order,
                    'details' => [
                        'name_en' => $skill->name_en,
                        'name_tr' => $skill->name_tr,
                        'level' => $skill->level->value,
                    ]
                ];
            })
        ];
    }
}
