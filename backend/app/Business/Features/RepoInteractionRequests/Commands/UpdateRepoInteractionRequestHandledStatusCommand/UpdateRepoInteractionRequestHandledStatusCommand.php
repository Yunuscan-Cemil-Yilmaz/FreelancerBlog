<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestHandledStatusCommand;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;

class UpdateRepoInteractionRequestHandledStatusCommand
{
    public function handle(int $id, bool $is_handled): array
    {
        $interaction = RepoInteractionRequest::find($id);
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
        return ['message' => 'Handled status updated successfully', 'data' => $interaction];
    }
}