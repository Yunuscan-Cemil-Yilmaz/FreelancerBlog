<?php

namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand;

use App\Models\InteractionDetail;
use App\Models\Domain;

class CreateInteractionDetailCommand
{
    public function handle(CreateInteractionDetailCommandRequest $request): array
    {
        $domain = Domain::where('domain', $request->host)->first();
        $detail = InteractionDetail::create([
            'interaction_id' => $request->interaction_id,
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
