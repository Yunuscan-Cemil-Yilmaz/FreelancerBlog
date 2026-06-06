<?php
namespace App\Business\Features\BlogInteractionRequests\Queries\GetBlogInteractionRequestDetailQuery;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GetBlogInteractionRequestDetailQuery
{
    public function handle(int $id): array
    {
        $interaction = BlogInteractionRequest::with('details')->find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        return $interaction->toArray();
    }
}