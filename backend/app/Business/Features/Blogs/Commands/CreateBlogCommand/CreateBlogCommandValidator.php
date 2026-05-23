<?php

namespace App\Business\Features\Blogs\Commands\CreateBlogCommand;

use Infrastructure\Extensions\BaseValidator;

class CreateBlogCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'title_en' => 'required|string|max:255',
            'title_tr' => 'required|string|max:255',
            'slug_en' => 'required|string|max:255|unique:blogs,slug_en',
            'slug_tr' => 'required|string|max:255|unique:blogs,slug_tr',
            'content_en' => 'required|string',
            'content_tr' => 'required|string',
            'excerpt_en' => 'nullable|string',
            'excerpt_tr' => 'nullable|string',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'author' => 'required|string|max:255',
            'read_time' => 'required|integer',
            'tags' => 'nullable|array',
            'category_id' => 'required|integer|exists:categories,id',
            'sub_category_id' => 'nullable|integer|exists:sub_categories,id',
        ]);
    }
}
