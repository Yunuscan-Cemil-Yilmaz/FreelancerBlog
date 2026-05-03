<?php

namespace App\Business\Features\Skills\Commands\UpdateSkillCommand;

use App\Models\Tech;

class UpdateSkillCommand
{
    public function handle(UpdateSkillCommandRequest $request): array
    {
        $skill = Tech::findOrFail($request->id);

        $skill->update([
            'category_en' => $request->category_en,
            'category_tr' => $request->category_tr,
            'items' => $request->items,
        ]);

        return [
            'message' => 'Skill updated successfully',
            'data' => $skill,
        ];
    }
}
