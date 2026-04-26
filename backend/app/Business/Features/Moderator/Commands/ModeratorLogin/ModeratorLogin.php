<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogin;

use App\Models\Moderator;
use App\Business\Features\Moderator\Services\CreateModeratorToken\CreateModeratorToken;
use App\Business\Features\Moderator\Services\DeleteModeratorTokenByModerator\DeleteModeratorTokenByModerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class ModeratorLogin
{
    private CreateModeratorToken $createModeratorToken;
    private DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator;

    public function __construct(
        CreateModeratorToken $createModeratorToken,
        DeleteModeratorTokenByModerator $deleteModeratorTokenByModerator
    ) {
        $this->createModeratorToken = $createModeratorToken;
        $this->deleteModeratorTokenByModerator = $deleteModeratorTokenByModerator;
    }

    public function handle(ModeratorLoginRequest $request): ModeratorLoginResponse
    {
        $moderator = Moderator::where('username', $request->username)->first();

        if (!$moderator || !Hash::check($request->password, $moderator->password)) {
            throw new AuthenticationException('Invalid credentials');
        }

        if (!$moderator->is_active) {
            throw new AuthenticationException('Your account is inactive. Please contact the administrator.');
        }

        // Delete existing tokens
        $this->deleteModeratorTokenByModerator->handle($moderator->id);

        // Create new token
        $tokenData = $this->createModeratorToken->handle(
            $moderator->id, 
            $moderator->domain, 
            $moderator->admin_domain
        );

        // Update last login
        $moderator->update([
            'last_login_at' => now(),
        ]);

        return new ModeratorLoginResponse(
            message: 'Moderator login successful',
            token: $tokenData['token'],
            expiresAt: $tokenData['expires_at']->toIso8601String(),
            moderator: $moderator
        );
    }
}
