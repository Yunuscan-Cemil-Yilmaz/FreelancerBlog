<?php

namespace App\Business\Features\ProfessionalSkills\Queries\GetProfessionalSkillAllListQuery;

use App\Models\ProfessionalSkill;

class GetProfessionalSkillAllListQuery
{
    public function handle(): array
    {
        $skills = ProfessionalSkill::orderBy('order')->get();

        $data = $skills->map(function (ProfessionalSkill $skill) {
            return [
                'id' => $skill->id,
                'name_en' => $skill->name_en,
                'name_tr' => $skill->name_tr,
                'icon' => $skill->icon,
                'level' => $skill->level->value,
                'order' => $skill->order,
            ];
        });

        return ['data' => $data];
    }
}
