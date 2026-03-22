<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(string $lang): JsonResponse
    {
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

        return response()->json(['data' => $data]);
    }
}
