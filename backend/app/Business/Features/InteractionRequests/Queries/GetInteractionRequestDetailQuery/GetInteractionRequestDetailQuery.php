<?php

namespace App\Business\Features\InteractionRequests\Queries\GetInteractionRequestDetailQuery;

use App\Models\InteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GetInteractionRequestDetailQuery
{
    public function handle(int $id): array
    {
        $interaction = InteractionRequest::with('details')->find($id);

        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }

        return $interaction->toArray();
    }
}
