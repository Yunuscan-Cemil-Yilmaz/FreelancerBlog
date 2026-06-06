<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand;

use App\Models\BlogInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateBlogInteractionRequestAdminNoteCommand
{
    public function handle(UpdateBlogInteractionRequestAdminNoteCommandRequest $request): array
    {
        $interaction = BlogInteractionRequest::find($request->id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['admin_note' => $request->admin_note]);
        return ['message' => 'Admin note updated successfully', 'data' => $interaction];
    }
}