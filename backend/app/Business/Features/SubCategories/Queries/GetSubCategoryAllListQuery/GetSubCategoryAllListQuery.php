<?php

namespace App\Business\Features\SubCategories\Queries\GetSubCategoryAllListQuery;

use App\Models\SubCategory;

class GetSubCategoryAllListQuery
{
    public function handle(): array
    {
        $subCategories = SubCategory::all();

        $data = $subCategories->map(function (SubCategory $sub) {
            return [
                'id' => $sub->id,
                'category_id' => $sub->category_id,
                'name_en' => $sub->name_en,
                'name_tr' => $sub->name_tr,
                'slug' => $sub->slug,
            ];
        });

        return ['data' => $data];
    }
}
