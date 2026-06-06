<?php
namespace App\Business\Features\RepoInteractionRequests\Queries\GetRepoInteractionRequestListQuery;

class GetRepoInteractionRequestListRequest
{
    public function __construct(
        public int $page = 1,
        public int $perPage = 10,
        public ?string $name = null,
        public ?string $email = null,
        public ?string $phone = null,
        public ?string $interaction_type = null,
        public ?string $title = null,
        public ?bool $is_readed = null,
        public ?bool $is_handled = null,
        public ?bool $is_completed = null,
        public ?bool $kvkk_approved = null
    ) {
    }
}