<?php

namespace App\Business\Features\Moderator\Commands\CreateModeratorCommand;

use App\Models\Moderator;
use App\Models\Domain;

class CreateModeratorCommand
{
    public function handle(CreateModeratorCommandRequest $request): CreateModeratorCommandResponse
    {
        $domainData = Domain::findOrFail($request->domain_id);

        $moderator = Moderator::create([
            'username' => $request->username,
            'password' => $request->password,
            'full_name' => $request->full_name,
            'domain' => $domainData->domain,
            'admin_domain' => $domainData->admin_domain,
            'is_active' => true,
        ]);

        return new CreateModeratorCommandResponse(
            message: 'Moderator created successfully',
            moderator: $moderator
        );
    }
}
