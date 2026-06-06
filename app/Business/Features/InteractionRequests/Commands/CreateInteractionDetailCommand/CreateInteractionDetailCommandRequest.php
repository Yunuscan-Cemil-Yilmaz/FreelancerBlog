<?php
namespace App\Business\Features\InteractionRequests\Commands\CreateInteractionDetailCommand;

class CreateInteractionDetailCommandRequest
{
    public function __construct(
        public int $interaction_id,
        public string $interaction_note,
        public int $contact_result,
        public string $host
    ) {
    }
}