<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\DeleteBlogInteractionRequestCommand;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeleteBlogInteractionRequestCommand
{
    public function handle(int $id): array
    {
        $interaction = BlogInteractionRequest::find($id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->details()->delete();
        $interaction->delete();
        return ['message' => 'Interaction request deleted successfully'];
    }
}