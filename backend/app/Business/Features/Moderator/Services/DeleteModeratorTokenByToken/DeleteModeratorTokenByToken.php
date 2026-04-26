<?php

namespace App\Business\Features\Moderator\Services\DeleteModeratorTokenByToken;

use App\Models\ModeratorToken;

class DeleteModeratorTokenByToken
{
    public function handle($token): void
    {
        ModeratorToken::where('token', $token)->delete();
    }
}
