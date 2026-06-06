<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestReadStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateInteractionRequestReadStatusCommand
{
    public function handle(int $id, bool $is_readed): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        $interaction->update(['is_readed' => $is_readed]);

        return [
            'message' => 'Read status updated successfully',
            'data' => $interaction
        ];
    }
}
