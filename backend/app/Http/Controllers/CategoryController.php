<?php

namespace App\Http\Controllers;

use App\Business\Features\Categories\Queries\GetCategoryListQuery\GetCategoryListQuery;
use App\Business\Features\Categories\Queries\GetCategoryListQuery\GetCategoryListRequest;
use App\Business\Features\Categories\Commands\CreateCategoryCommand\CreateCategoryCommand;
use App\Business\Features\Categories\Commands\CreateCategoryCommand\CreateCategoryCommandRequest;
use App\Business\Features\Categories\Commands\CreateCategoryCommand\CreateCategoryCommandValidator;
use App\Business\Features\Categories\Commands\UpdateCategoryCommand\UpdateCategoryCommand;
use App\Business\Features\Categories\Commands\UpdateCategoryCommand\UpdateCategoryCommandRequest;
use App\Business\Features\Categories\Commands\UpdateCategoryCommand\UpdateCategoryCommandValidator;
use App\Business\Features\Categories\Commands\DeleteCategoryCommand\DeleteCategoryCommand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(string $lang, GetCategoryListQuery $query): JsonResponse
    {
        $categoryRequest = new GetCategoryListRequest($lang);
        $result = $query->handle($categoryRequest);

        return response()->json($result);
    }

    public function createCategory(Request $request, CreateCategoryCommand $command, CreateCategoryCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateCategoryCommandRequest(
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            slug: $request->input('slug'),
            request_domain: $request->header('domain') ?? $request->input('domain')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateCategory(Request $request, UpdateCategoryCommand $command, UpdateCategoryCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateCategoryCommandRequest(
            id: (int) $request->input('id'),
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            slug: $request->input('slug')
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteCategory(Request $request, DeleteCategoryCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
}
