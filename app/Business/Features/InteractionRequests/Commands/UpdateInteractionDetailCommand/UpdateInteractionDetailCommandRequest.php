<?php
namespace App\Business\Features\InteractionRequests\Commands\UpdateInteractionDetailCommand;

class UpdateInteractionDetailCommandRequest
{
    public function __construct(
        public int $id,
        public string $interaction_note,
        public int $contact_result
    ) {
    }
}