<?php
namespace App\Business\Features\RepoInteractionRequests\Commands\UpdateRepoInteractionRequestAdminNoteCommand;

class UpdateRepoInteractionRequestAdminNoteCommandRequest
{
    public function __construct(
        public int $id,
        public ?string $admin_note
    ) {
    }
}