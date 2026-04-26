<?php

namespace App\Business\Features\Moderator\Commands\ModeratorLogin;

use App\Models\Moderator;
use Infrastructure\Extensions\BaseResponse;

class ModeratorLoginResponse extends BaseResponse
{
    public function __construct(
        string $message,
        public string $token,
        public string $expiresAt,
        public Moderator $moderator
    ) {
        parent::__construct($message);
    }
}
