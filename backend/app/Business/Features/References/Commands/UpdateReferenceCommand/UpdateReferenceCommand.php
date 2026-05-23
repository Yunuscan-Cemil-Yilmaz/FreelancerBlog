<?php

namespace App\Business\Features\References\Commands\UpdateReferenceCommand;

use App\Models\UserReference;

class UpdateReferenceCommand
{
    public function handle(UpdateReferenceCommandRequest $request): array
    {
        $reference = UserReference::findOrFail($request->id);

        $reference->update([
            'name' => $request->name,
            'role_en' => $request->role_en,
            'role_tr' => $request->role_tr,
            'company' => $request->company,
            'quote_en' => $request->quote_en,
            'quote_tr' => $request->quote_tr,
        ]);

        return [
            'message' => 'Reference updated successfully',
            'data' => $reference,
        ];
    }
}
