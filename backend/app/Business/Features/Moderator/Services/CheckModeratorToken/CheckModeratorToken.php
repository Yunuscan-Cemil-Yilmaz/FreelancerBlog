<?php

namespace App\Business\Features\Moderator\Services\CheckModeratorToken;

use App\Models\ModeratorToken;
use Illuminate\Auth\AuthenticationException;

class CheckModeratorToken
{
    public function handle($moderatorId, $token)
    {
        $moderatorToken = ModeratorToken::where('moderator_id', $moderatorId)
            ->where('token', $token)
            ->first();

        if (!$moderatorToken) {
            throw new AuthenticationException('Invalid credentials');
        }

        if ($moderatorToken->expires_at < now()) {
            throw new AuthenticationException('Invalid credentials');
        }

        return true;
    }
}
