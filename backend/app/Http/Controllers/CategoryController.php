<?php

namespace App\Http\Controllers;

use App\Business\Features\Categories\GetCategoryListQuery\GetCategoryListQuery;
use App\Business\Features\Categories\GetCategoryListQuery\GetCategoryListRequest;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(string $lang, GetCategoryListQuery $query): JsonResponse
    {
        $categoryRequest = new GetCategoryListRequest($lang);
        $result = $query->handle($categoryRequest);

        return response()->json($result);
    }
}
