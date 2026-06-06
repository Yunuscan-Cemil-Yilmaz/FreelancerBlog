<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestHandledStatusCommand;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateRepoInteractionRequestHandledStatusCommand
{
    public function handle(int $id, bool $is_handled): array
    {
        $interaction = RepoInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['is_handled' => $is_handled]);
        return ['message' => 'Handled status updated successfully', 'data' => $interaction];
    }
}