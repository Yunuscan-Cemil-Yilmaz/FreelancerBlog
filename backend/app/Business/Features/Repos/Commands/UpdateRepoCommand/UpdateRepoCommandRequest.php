<?php

namespace App\Business\Features\Repos\Commands\UpdateRepoCommand;

use Illuminate\Http\UploadedFile;

class UpdateRepoCommandRequest
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly string $slug,
        public readonly string $description_en,
        public readonly string $description_tr,
        public readonly ?UploadedFile $main_image,
        public readonly bool $delete_main_image,
        public readonly ?array $gallery_images,
        public readonly array $existing_gallery_images,
        public readonly ?string $project_url,
        public readonly ?string $repo_url,
        public readonly bool $is_public,
        public readonly ?array $tech_stack
    ) {}
}
