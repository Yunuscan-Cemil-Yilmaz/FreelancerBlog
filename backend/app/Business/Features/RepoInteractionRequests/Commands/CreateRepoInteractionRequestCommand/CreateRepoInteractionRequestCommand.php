<?php

namespace App\Business\Features\RepoInteractionRequests\Commands\CreateRepoInteractionRequestCommand;

use App\Models\RepoInteractionRequest;
use App\Models\Domain;

class CreateRepoInteractionRequestCommand
{
    public function handle(CreateRepoInteractionRequestCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();

        $interaction = RepoInteractionRequest::create([
            'repo_id' => $request->repo_id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'interaction_type' => $request->interaction_type,
            'title' => $request->title,
            'message' => $request->message,
            'preferred_contact_time' => $request->preferred_contact_time,
            'kvkk_approved' => $request->kvkk_approved,
            'ip_address' => $request->ip_address,
            'user_agent' => $request->user_agent,
            'domain' => $request->host,
            'admin_domain' => $domain ? $domain->admin_domain : $request->host,
            'is_readed' => false,
            'is_handled' => false,
            'is_completed' => false,
        ]);

        return [
            'message' => 'Repo interaction request created successfully',
            'data' => $interaction,
        ];
    }
}
