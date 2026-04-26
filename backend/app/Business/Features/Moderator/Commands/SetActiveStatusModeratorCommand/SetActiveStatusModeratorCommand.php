<?php

namespace App\Business\Features\Moderator\Commands\SetActiveStatusModeratorCommand;

use App\Models\Moderator;
use App\Business\Features\Moderator\Services\DeleteModeratorTokenByModerator\DeleteModeratorTokenByModerator;

class SetActiveStatusModeratorCommand
{
    private DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator;

    public function __construct(DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator)
    {
        $this->deleteModeratorTokenByModerator = $deleteModeratorTokenByModerator;
    }

    public function handle(int $id, bool $isActive): array
    {
        $moderator = Moderator::findOrFail($id);

        $moderator->update([
            'is_active' => $isActive,
        ]);

        if (!$isActive) {
            $this->deleteModeratorTokenByModerator->handle($id);
        }

        return [
            'message' => 'Moderator status updated successfully',
            'is_active' => $isActive,
        ];
    }
}
