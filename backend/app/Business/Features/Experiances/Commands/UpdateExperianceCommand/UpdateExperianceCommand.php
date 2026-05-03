<?php

namespace App\Business\Features\Experiances\Commands\UpdateExperianceCommand;

use App\Models\Experiance;

class UpdateExperianceCommand
{
    public function handle(UpdateExperianceCommandRequest $request): array
    {
        $experiance = Experiance::findOrFail($request->id);

        $experiance->update([
            'year_en' => $request->year_en,
            'year_tr' => $request->year_tr,
            'role_en' => $request->role_en,
            'role_tr' => $request->role_tr,
            'company_en' => $request->company_en,
            'company_tr' => $request->company_tr,
            'description_en' => $request->description_en,
            'description_tr' => $request->description_tr,
            'order' => $request->order,
        ]);

        return [
            'message' => 'Experience updated successfully',
            'data' => $experiance,
        ];
    }
}
