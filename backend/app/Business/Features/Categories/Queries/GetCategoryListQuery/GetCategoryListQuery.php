<?php

namespace App\Business\Features\Categories\Queries\GetCategoryListQuery;

use App\Models\Category;

class GetCategoryListQuery
{
    public function handle(GetCategoryListRequest $request): array
    {
        $lang = $request->lang;
        $nameField = "name_{$lang}";

        $categories = Category::with('subCategories')->get();

        $data = $categories->map(function (Category $category) use ($nameField) {
            return [
                'id' => $category->id,
                'name' => $category->{$nameField},
                'slug' => $category->slug,
                'subCategories' => $category->subCategories->map(function ($sub) use ($nameField) {
                    return [
                        'id' => $sub->id,
                        'name' => $sub->{$nameField},
                        'slug' => $sub->slug,
                    ];
                }),
            ];
        });

        return ['data' => $data];
    }
}
