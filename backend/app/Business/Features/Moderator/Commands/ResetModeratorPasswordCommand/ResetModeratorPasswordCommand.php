<?php

namespace App\Business\Features\Moderator\Commands\ResetModeratorPasswordCommand;

use App\Models\Moderator;
use App\Business\Features\Moderator\Services\DeleteModeratorTokenByModerator\DeleteModeratorTokenByModerator;

class ResetModeratorPasswordCommand
{
    private DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator;

    public function __construct(DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator)
    {
        $this->deleteModeratorTokenByModerator = $deleteModeratorTokenByModerator;
    }

    public function handle(int $id, string $newPassword): array
    {
        $moderator = Moderator::findOrFail($id);

        $moderator->update([
            'password' => $newPassword, // Model casts will handle hashing
        ]);

        // Kick out moderator on password reset
        $this->deleteModeratorTokenByModerator->handle($id);

        return [
            'message' => 'Moderator password reset successfully',
        ];
    }
}
