<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestReadStatusCommand;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateBlogInteractionRequestReadStatusCommand
{
    public function handle(int $id, bool $is_readed): array
    {
        $interaction = BlogInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['is_readed' => $is_readed]);
        return ['message' => 'Read status updated successfully', 'data' => $interaction];
    }
}