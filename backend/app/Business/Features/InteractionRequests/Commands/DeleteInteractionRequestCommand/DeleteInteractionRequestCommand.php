<?php

namespace App\Business\Features\InteractionRequests\Commands\DeleteInteractionRequestCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteInteractionRequestCommand
{
    public function handle(int $id): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        // Details cascade delete must be handled either by DB foreign key or manually here.
        // Assuming no DB cascade, we delete manually
        $interaction->details()->delete();
        $interaction->delete();

        return [
            'message' => 'Interaction request deleted successfully'
        ];
    }
}
