<?php
namespace App\Business\Features\RepoInteractionRequests\Queries\GetRepoInteractionRequestDetailQuery;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GetRepoInteractionRequestDetailQuery
{
    public function handle(int $id): array
    {
        $interaction = RepoInteractionRequest::with('details')->find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        return $interaction->toArray();
    }
}