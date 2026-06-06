<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateInteractionRequestAdminNoteCommand
{
    public function handle(UpdateInteractionRequestAdminNoteCommandRequest $request): array
    {
        $interaction = InteractionRequest::find($request->id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        $interaction->update(['admin_note' => $request->admin_note]);

        return [
            'message' => 'Admin note updated successfully',
            'data' => $interaction
        ];
    }
}
