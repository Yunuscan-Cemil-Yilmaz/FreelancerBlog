<?php

namespace App\Business\Features\Repos\Commands\UpdateRepoCommand;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateRepoCommandValidator
{
    public function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:repos,id',
            'title' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('repos')->ignore($data['id'] ?? null)
            ],
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'delete_main_image' => 'nullable|boolean',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_gallery_images' => 'nullable|array',
            'project_url' => 'nullable|string|url|max:255',
            'repo_url' => 'nullable|string|url|max:255',
            'is_public' => 'required|boolean',
            'tech_stack' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
