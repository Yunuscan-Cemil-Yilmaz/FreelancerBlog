<?php

namespace App\Business\Features\SubCategories\Queries\GetSubCategoryListQuery;

use App\Models\SubCategory;

class GetSubCategoryListQuery
{
    public function handle(GetSubCategoryListRequest $request): array
    {
        $lang = $request->lang;
        $nameField = "name_{$lang}";

        $subCategories = SubCategory::orderBy('order')->get();

        $data = $subCategories->map(function (SubCategory $sub) use ($nameField) {
            return [
                'id' => $sub->id,
                'category_id' => $sub->category_id,
                'name' => $sub->{$nameField},
                'slug' => $sub->slug,
                'order' => $sub->order,
            ];
        });

        return ['data' => $data];
    }
}
