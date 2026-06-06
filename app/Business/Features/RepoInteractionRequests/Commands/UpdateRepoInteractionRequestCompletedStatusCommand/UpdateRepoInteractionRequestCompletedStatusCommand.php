<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestCompletedStatusCommand;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateRepoInteractionRequestCompletedStatusCommand
{
    public function handle(int $id, bool $is_completed): array
    {
        $interaction = RepoInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['is_completed' => $is_completed]);
        return ['message' => 'Completed status updated successfully', 'data' => $interaction];
    }
}