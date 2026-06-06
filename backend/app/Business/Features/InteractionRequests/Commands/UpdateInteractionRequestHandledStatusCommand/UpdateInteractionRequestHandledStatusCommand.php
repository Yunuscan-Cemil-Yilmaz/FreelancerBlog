<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestHandledStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateInteractionRequestHandledStatusCommand
{
    public function handle(int $id, bool $is_handled): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        $interaction->update(['is_handled' => $is_handled]);

        return [
            'message' => 'Handled status updated successfully',
            'data' => $interaction
        ];
    }
}
