<?php

namespace App\Business\Features\Moderator\Services\DeleteModeratorTokenByModerator;

use App\Models\ModeratorToken;

class DeleteModeratorTokenByModerator
{
    public function handle($moderatorId): void
    {
        ModeratorToken::where('moderator_id', $moderatorId)->delete();
    }
}
