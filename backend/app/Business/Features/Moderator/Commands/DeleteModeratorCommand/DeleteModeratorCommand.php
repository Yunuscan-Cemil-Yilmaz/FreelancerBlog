<?php

namespace App\Business\Features\Moderator\Commands\DeleteModeratorCommand;

use App\Models\Moderator;
use App\Business\Features\Moderator\Services\DeleteModeratorTokenByModerator\DeleteModeratorTokenByModerator;

class DeleteModeratorCommand
{
    private DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator;

    public function __construct(DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator)
    {
        $this->deleteModeratorTokenByModerator = $deleteModeratorTokenByModerator;
    }

    public function handle(int $id): array
    {
        $moderator = Moderator::find($id);
        
        if (!$moderator) {
            return [
                'message' => 'Moderator not found',
            ];
        }

        // Delete tokens first
        $this->deleteModeratorTokenByModerator->handle($id);

        $moderator->delete();

        return [
            'message' => 'Moderator deleted successfully',
        ];
    }
}
