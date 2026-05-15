<?php

namespace App\Business\Features\Moderator\Queries\GetModeratorDetailsQuery;

use App\Models\Moderator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetModeratorDetailsQuery
{
    public function handle(int $id): array
    {
        $moderator = Moderator::with('domain')->find($id);

        if (!$moderator) {
            throw new ModelNotFoundException("Moderator not found with ID: " . $id);
        }

        return [
            'message' => 'Moderator details retrieved successfully',
            'data' => $moderator,
        ];
    }
}
