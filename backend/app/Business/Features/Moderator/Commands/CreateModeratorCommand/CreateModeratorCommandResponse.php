<?php

namespace App\Business\Features\Moderator\Commands\CreateModeratorCommand;

use App\Models\Moderator;
use Infrastructure\Extensions\BaseResponse;

class CreateModeratorCommandResponse extends BaseResponse
{
    public function __construct(
        string $message,
        public Moderator $moderator
    ) {
        parent::__construct($message);
    }
}
