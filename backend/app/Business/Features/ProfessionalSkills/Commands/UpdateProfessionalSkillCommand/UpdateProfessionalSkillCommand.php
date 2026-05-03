<?php

namespace App\Business\Features\ProfessionalSkills\Commands\UpdateProfessionalSkillCommand;

use App\Models\ProfessionalSkill;

class UpdateProfessionalSkillCommand
{
    public function handle(UpdateProfessionalSkillCommandRequest $request): array
    {
        $skill = ProfessionalSkill::findOrFail($request->id);

        $skill->update([
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'icon' => $request->icon,
            'level' => $request->level,
        ]);

        return [
            'message' => 'Professional skill updated successfully',
            'data' => $skill,
        ];
    }
}
