<?php

namespace App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand;

use App\Models\SubCategory;

class UpdateSubCategoryCommand
{
    public function handle(UpdateSubCategoryCommandRequest $request): array
    {
        $subCategory = SubCategory::findOrFail($request->id);

        $subCategory->update([
            'category_id' => $request->category_id,
            'name_en' => $request->name_en,
            'name_tr' => $request->name_tr,
            'slug' => $request->slug,
        ]);

        return [
            'message' => 'SubCategory updated successfully',
            'data' => $subCategory,
        ];
    }
}
