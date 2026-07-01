<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\DeleteRepoInteractionRequestCommand;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteRepoInteractionRequestCommand
{
    public function handle(int $id): array
    {
        $interaction = RepoInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->details()->delete();
        $interaction->delete();
        return ['message' => 'Interaction request deleted successfully'];
    }
}