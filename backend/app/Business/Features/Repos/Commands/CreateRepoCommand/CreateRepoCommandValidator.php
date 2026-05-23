<?php

namespace App\Business\Features\Repos\Commands\CreateRepoCommand;

use App\Exceptions\ValidationException;
use Illuminate\Support\Facades\Validator;

class CreateRepoCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:repos,slug',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'project_url' => 'nullable|string|url|max:255',
            'repo_url' => 'nullable|string|url|max:255',
            'is_public' => 'required|boolean',
            'tech_stack' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator->errors()->first(), $validator->errors()->toArray());
        }
    }
}
