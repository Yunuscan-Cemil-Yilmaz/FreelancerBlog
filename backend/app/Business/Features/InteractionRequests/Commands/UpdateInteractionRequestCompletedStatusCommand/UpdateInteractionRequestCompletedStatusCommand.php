<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestCompletedStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateInteractionRequestCompletedStatusCommand
{
    public function handle(int $id, bool $is_completed): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        $interaction->update(['is_completed' => $is_completed]);

        return [
            'message' => 'Completed status updated successfully',
            'data' => $interaction
        ];
    }
}
