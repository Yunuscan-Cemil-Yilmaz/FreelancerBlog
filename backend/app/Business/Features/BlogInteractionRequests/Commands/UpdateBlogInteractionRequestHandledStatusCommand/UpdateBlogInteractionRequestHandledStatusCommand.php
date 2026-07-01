<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestHandledStatusCommand;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;

class UpdateBlogInteractionRequestHandledStatusCommand
{
    public function handle(int $id, bool $is_handled): array
    {
        $interaction = BlogInteractionRequest::find($id);
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