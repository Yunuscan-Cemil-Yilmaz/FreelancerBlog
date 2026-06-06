<?php

namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionRequestAdminNoteCommand;

class UpdateInteractionRequestAdminNoteCommandRequest
{
    public function __construct(
        public int $id,
        public ?string $admin_note
    ) {
    }
}
