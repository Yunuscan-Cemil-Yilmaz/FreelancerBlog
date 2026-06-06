<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestCompletedStatusCommand;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateBlogInteractionRequestCompletedStatusCommand
{
    public function handle(int $id, bool $is_completed): array
    {
        $interaction = BlogInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['is_completed' => $is_completed]);
        return ['message' => 'Completed status updated successfully', 'data' => $interaction];
    }
}