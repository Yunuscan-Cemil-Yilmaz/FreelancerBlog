<?php

namespace App\Business\Features\Repos\Commands\CreateRepoCommand;

use Illuminate\Http\UploadedFile;

class CreateRepoCommandRequest
{
    public function __construct(
        public readonly string $title,
        public readonly string $slug,
        public readonly string $description_en,
        public readonly string $description_tr,
        public readonly ?UploadedFile $main_image,
        public readonly ?array $gallery_images,
        public readonly ?string $project_url,
        public readonly ?string $repo_url,
        public readonly bool $is_public,
        public readonly ?array $tech_stack
    ) {}
}
