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
            'repo_interaction_id' => $request->repo_interaction_id,
            'interaction_note' => $request->interaction_note,
            'contact_result' => $request->contact_result,
            'domain' => $request->host,
            'admin_domain' => $domain ? $domain->admin_domain : $request->host,
        ]);
        return ['message' => 'Detail added successfully', 'data' => $detail];
    }
}