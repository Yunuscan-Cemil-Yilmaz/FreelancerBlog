<?php

namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionRequestCommand;

use App\Models\InteractionRequest;
use App\Models\Domain;

class CreateInteractionRequestCommand
{
    public function handle(CreateInteractionRequestCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();

        $interaction = InteractionRequest::create([
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
            'message' => 'Interaction request created successfully',
            'data' => $interaction,
        ];
    }
}
