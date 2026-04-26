<?php

namespace App\Business\Features\Moderator\Commands\ModeratorOAuth;

use App\Business\Features\Moderator\Services\CheckModeratorToken\CheckModeratorToken;
use App\Models\Moderator;
use Illuminate\Auth\AuthenticationException;

class ModeratorOAuth
{
    private CheckModeratorToken $checkModeratorToken;

    public function __construct(CheckModeratorToken $checkModeratorToken) {
        $this->checkModeratorToken = $checkModeratorToken;
    }

    public function handle($moderatorId, $token)
    {
        $this->checkModeratorToken->handle($moderatorId, $token);

        $moderator = Moderator::find($moderatorId);

        if (!$moderator) {
            throw new AuthenticationException('Invalid credentials');
        }

        if (!$moderator->is_active) {
            throw new AuthenticationException('Your account is inactive. Please contact the administrator.');
        }

        return response()->json([
            'message' => 'Moderator token is valid',
            'moderator' => $moderator
        ]);
    }
}
