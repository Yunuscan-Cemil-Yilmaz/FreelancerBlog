<?php

namespace App\Business\Features\Educations\Commands\UpdateEducationCommand;

use App\Models\Education;

class UpdateEducationCommand
{
    public function handle(UpdateEducationCommandRequest $request): array
    {
        $education = Education::findOrFail($request->id);

        $education->update([
            'year_en' => $request->year_en,
            'year_tr' => $request->year_tr,
            'degree_en' => $request->degree_en,
            'degree_tr' => $request->degree_tr,
            'school_en' => $request->school_en,
            'school_tr' => $request->school_tr,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
        ]);

        return [
            'message' => 'Education updated successfully',
            'data' => $education,
        ];
    }
}
