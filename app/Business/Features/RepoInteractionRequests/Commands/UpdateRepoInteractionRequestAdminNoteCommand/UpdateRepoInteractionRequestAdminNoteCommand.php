<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand;

use App\Models\RepoInteractionRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateRepoInteractionRequestAdminNoteCommand
{
    public function handle(UpdateRepoInteractionRequestAdminNoteCommandRequest $request): array
    {
        $interaction = RepoInteractionRequest::find($request->id);
        if (!$interaction) {
            throw new NotFoundHttpException('Interaction request not found');
        }
        $interaction->update(['admin_note' => $request->admin_note]);
        return ['message' => 'Admin note updated successfully', 'data' => $interaction];
    }
}