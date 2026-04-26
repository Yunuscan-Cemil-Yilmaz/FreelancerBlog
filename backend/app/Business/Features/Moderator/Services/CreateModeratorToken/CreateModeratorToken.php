<?php

namespace App\Business\Features\Moderator\Services\CreateModeratorToken;

use App\Models\ModeratorToken;

class CreateModeratorToken
{
    public function handle($moderatorId, $domain = null, $adminDomain = null)
    {
        $token = bin2hex(random_bytes(32));

        $moderatorToken = ModeratorToken::create([
            'moderator_id' => $moderatorId,
            'token' => $token,
            'domain' => $domain,
            'admin_domain' => $adminDomain,
        ]);

        return [
            'token' => $moderatorToken->token,
            'expires_at' => $moderatorToken->expires_at,
        ];
    }
}
