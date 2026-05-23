<?php

namespace App\Business\Features\Categories\Queries\GetCategoryAllListQuery;

use App\Models\Category;

class GetCategoryAllListQuery
{
    public function handle(): array
    {
        $categories = Category::all();

        $data = $categories->map(function (Category $category) {
            return [
                'id' => $category->id,
                'name_en' => $category->name_en,
                'name_tr' => $category->name_tr,
                'slug' => $category->slug,
            ];
        });

        return ['data' => $data];
    }
}
