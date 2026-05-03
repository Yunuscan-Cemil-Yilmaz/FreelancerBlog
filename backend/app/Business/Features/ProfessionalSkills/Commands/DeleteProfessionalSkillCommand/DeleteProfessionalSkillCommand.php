<?php

namespace App\Business\Features\ProfessionalSkills\Commands\DeleteProfessionalSkillCommand;

use App\Models\ProfessionalSkill;

class DeleteProfessionalSkillCommand
{
    public function handle(int $id): array
    {
        $skill = ProfessionalSkill::findOrFail($id);
        $skill->delete();

        return [
            'message' => 'Professional skill deleted successfully',
        ];
    }
}
