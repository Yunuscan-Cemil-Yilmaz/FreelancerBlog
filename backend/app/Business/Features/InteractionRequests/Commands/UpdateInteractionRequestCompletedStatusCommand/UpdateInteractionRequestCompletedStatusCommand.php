<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestCompletedStatusCommand;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;

class UpdateInteractionRequestCompletedStatusCommand
{
    public function handle(int $id, bool $is_completed): array
    {
        $interaction = InteractionRequest::find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        if ($is_completed) {
            if (!$interaction->is_handled) {
                throw ValidationException::withMessages([
                    'is_completed' => ['Cannot mark as completed before the request is marked as handled.']
                ]);
            }
        }

        $interaction->update(['is_completed' => $is_completed]);

        return [
            'message' => 'Completed status updated successfully',
            'data' => $interaction
        ];
    }
}
