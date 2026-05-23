<?php

namespace App\Business\Features\Blogs\Commands\UpdateBlogCommand;

use Infrastructure\Extensions\BaseValidator;
use Illuminate\Validation\Rule;

class UpdateBlogCommandValidator extends BaseValidator
{
    public function validate(array $data): void
    {
        $this->executeValidation($data, [
            'id' => 'required|integer|exists:blogs,id',
            'title_en' => 'required|string|max:255',
            'title_tr' => 'required|string|max:255',
            'slug_en' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blogs')->ignore($data['id'] ?? null)
            ],
            'slug_tr' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blogs')->ignore($data['id'] ?? null)
            ],
            'content_en' => 'required|string',
            'content_tr' => 'required|string',
            'excerpt_en' => 'nullable|string',
            'excerpt_tr' => 'nullable|string',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'delete_main_image' => 'nullable|boolean',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_gallery_images' => 'nullable|array',
            'existing_gallery_images.*' => 'string',
            'author' => 'required|string|max:255',
            'read_time' => 'required|integer',
            'tags' => 'nullable|array',
            'category_id' => 'required|integer|exists:categories,id',
            'sub_category_id' => 'nullable|integer|exists:sub_categories,id',
        ]);
    }
}
