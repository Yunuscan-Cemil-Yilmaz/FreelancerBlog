<?php

namespace App\Business\Features\Moderator\Commands\UpdateModeratorDomainCommand;

class UpdateModeratorDomainCommandRequest
{
    public function __construct(
        public int $id,
        public int $domain_id
    ) {
    }
}
