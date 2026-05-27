<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionRequestCommand;

use App\Models\BlogInteractionRequest;
use App\Models\Domain;

class CreateBlogInteractionRequestCommand
{
    public function handle(CreateBlogInteractionRequestCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();

        $interaction = BlogInteractionRequest::create([
            'blog_id' => $request->blog_id,
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
            'message' => 'Blog interaction request created successfully',
            'data' => $interaction,
        ];
    }
}
