<?php

namespace App\Business\Features\Blogs\Commands\CreateBlogCommand;

class CreateBlogCommandRequest
{
    public function __construct(
        public string $title_en,
        public string $title_tr,
        public string $slug_en,
        public string $slug_tr,
        public string $content_en,
        public string $content_tr,
        public ?string $excerpt_en,
        public ?string $excerpt_tr,
        public ?\Illuminate\Http\UploadedFile $main_image,
        public ?array $gallery_images,
        public string $author,
        public int $read_time,
        public ?array $tags,
        public int $category_id,
        public ?int $sub_category_id
    ) {}
}
