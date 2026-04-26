<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogout;

use App\Business\Features\Moderator\Services\DeleteModeratorTokenByToken\DeleteModeratorTokenByToken;

class ModeratorLogout
{
    private DeleteModeratorTokenByToken $deleteModeratorTokenByToken;

    public function __construct(DeleteModeratorTokenByToken $deleteModeratorTokenByToken) {
        $this->deleteModeratorTokenByToken = $deleteModeratorTokenByToken;
    }

    public function handle($moderatorId, $token)
    {
        $this->deleteModeratorTokenByToken->handle($token);

        return response()->json([
            'message' => 'Moderator logged out successfully',
        ]);
    }
}
