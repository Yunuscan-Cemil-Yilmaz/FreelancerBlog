<?php

namespace App\Business\Features\Experiances\Commands\DeleteExperianceCommand;

use App\Models\Experiance;

class DeleteExperianceCommand
{
    public function handle(int $id): array
    {
        $experiance = Experiance::findOrFail($id);
        $experiance->delete();

        return [
            'message' => 'Experience deleted successfully',
        ];
    }
}
