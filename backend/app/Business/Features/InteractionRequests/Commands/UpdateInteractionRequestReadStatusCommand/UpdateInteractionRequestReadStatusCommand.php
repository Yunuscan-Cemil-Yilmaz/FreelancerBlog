<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestReadStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;

class UpdateInteractionRequestReadStatusCommand
{
    public function handle(int $id, bool $is_readed): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        if (!$is_readed) {
            if ($interaction->is_handled || $interaction->is_completed) {
                throw ValidationException::withMessages([
                    'is_readed' => ['Cannot mark as unread while the request is handled or completed.']
                ]);
            }
        }

        $interaction->update(['is_readed' => $is_readed]);

        return [
            'message' => 'Read status updated successfully',
            'data' => $interaction
        ];
    }
}
