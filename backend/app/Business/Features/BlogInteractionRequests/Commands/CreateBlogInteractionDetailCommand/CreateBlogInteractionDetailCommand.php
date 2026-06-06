<?php

namespace App\Business\Features\BlogInteractionRequests\Commands\CreateBlogInteractionDetailCommand;

use App\Models\BlogInteractionDetail;
use App\Models\Domain;

class CreateBlogInteractionDetailCommand
{
    public function handle(CreateBlogInteractionDetailCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();
        $detail = BlogInteractionDetail::create([
            'interaction_id' => $request->blog_interaction_id,
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
