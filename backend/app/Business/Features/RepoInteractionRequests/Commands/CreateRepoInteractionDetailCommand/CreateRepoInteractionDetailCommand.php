<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionDetailCommand;

use App\Models\RepoInteractionDetail;
use App\Models\Domain;

class CreateRepoInteractionDetailCommand
{
    public function handle(CreateRepoInteractionDetailCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();
        $detail = RepoInteractionDetail::create([
            'interaction_id' => $request->repo_interaction_id,
            'interaction_note' => $request->interaction_note,
            'domain' => $request->host ?? 'localhost',
            'admin_domain' => $domain ? $domain->admin_domain : ($request->host ?? 'localhost')
        ]);

        return [
            'message' => 'Detail created successfully',
            'data' => $detail
        ];
    }
}
