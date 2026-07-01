<?php
namespace App\Business\Features\BlogInteractionRequests\Commands\UpdateBlogInteractionRequestAdminNoteCommand;

class UpdateBlogInteractionRequestAdminNoteCommandRequest
{
    public function __construct(
        public int $id,
        public ?string $admin_note
    ) {
    }
}