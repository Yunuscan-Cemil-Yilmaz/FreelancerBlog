<?php

namespace App\Business\Features\Categories\Commands\UpdateCategoryCommand;

use App\Models\Category;

class UpdateCategoryCommand
{
    public function handle(UpdateCategoryCommandRequest $request): array
    {
        $category = Category::findOrFail($request->id);

        $category->update([
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'slug' => $request->slug,
        ]);

        return [
            'message' => 'Category updated successfully',
            'data' => $category,
        ];
    }
}
