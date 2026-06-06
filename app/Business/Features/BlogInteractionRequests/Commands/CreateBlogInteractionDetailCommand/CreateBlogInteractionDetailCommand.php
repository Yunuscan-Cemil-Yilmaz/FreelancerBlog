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
            'blog_interaction_id' => $request->blog_interaction_id,
            'interaction_note' => $request->interaction_note,
            'contact_result' => $request->contact_result,
            'domain' => $request->host,
            'admin_domain' => $domain ? $domain->admin_domain : $request->host,
        ]);
        return ['message' => 'Detail added successfully', 'data' => $detail];
    }
}