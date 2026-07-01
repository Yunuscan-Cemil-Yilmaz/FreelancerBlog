<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestHandledStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;

class UpdateInteractionRequestHandledStatusCommand
{
    public function handle(int $id, bool $is_handled): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        if ($is_handled) {
            if (!$interaction->is_readed) {
                throw ValidationException::withMessages([
                    'is_handled' => ['Cannot mark as handled before the request is marked as read.']
                ]);
            }
        } else {
            if ($interaction->is_completed) {
                throw ValidationException::withMessages([
                    'is_handled' => ['Cannot mark as unhandled while the request is still marked as completed.']
                ]);
            }
        }

        $interaction->update(['is_handled' => $is_handled]);

        return [
            'message' => 'Handled status updated successfully',
            'data' => $interaction
        ];
    }
}
