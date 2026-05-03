<?php

namespace App\Business\Features\Skills\Commands\DeleteSkillCommand;

use App\Models\Tech;

class DeleteSkillCommand
{
    public function handle(int $id): array
    {
        $tech = Tech::findOrFail($id);
        $tech->delete();

        return [
            'message' => 'Skill deleted successfully',
        ];
    }
}
