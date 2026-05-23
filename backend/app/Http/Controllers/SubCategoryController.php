<?php

namespace App\Http\Controllers;

use App\Business\Features\SubCategories\Queries\GetSubCategoryListQuery\GetSubCategoryListQuery;
use App\Business\Features\SubCategories\Queries\GetSubCategoryListQuery\GetSubCategoryListRequest;
use App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand\CreateSubCategoryCommand;
use App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand\CreateSubCategoryCommandRequest;
use App\Business\Features\SubCategories\Commands\CreateSubCategoryCommand\CreateSubCategoryCommandValidator;
use App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand\UpdateSubCategoryCommand;
use App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand\UpdateSubCategoryCommandRequest;
use App\Business\Features\SubCategories\Commands\UpdateSubCategoryCommand\UpdateSubCategoryCommandValidator;
use App\Business\Features\SubCategories\Commands\DeleteSubCategoryCommand\DeleteSubCategoryCommand;
use App\Business\Features\SubCategories\Queries\GetSubCategoryAllListQuery\GetSubCategoryAllListQuery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function indexForModerator(GetSubCategoryAllListQuery $query): JsonResponse
    {
        return response()->json($query->handle());
    }

    public function index(string $lang, GetSubCategoryListQuery $query): JsonResponse
    {
        $request = new GetSubCategoryListRequest($lang);
        $result = $query->handle($request);

        return response()->json($result);
    }

    public function createSubCategory(Request $request, CreateSubCategoryCommand $command, CreateSubCategoryCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $createRequest = new CreateSubCategoryCommandRequest(
            category_id: (int) $request->input('category_id'),
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            slug: $request->input('slug')
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateSubCategory(Request $request, UpdateSubCategoryCommand $command, UpdateSubCategoryCommandValidator $validator): JsonResponse
    {
        $validator->validate($request->all());

        $updateRequest = new UpdateSubCategoryCommandRequest(
            id: (int) $request->input('id'),
            category_id: (int) $request->input('category_id'),
            name_en: $request->input('name_en'),
            name_tr: $request->input('name_tr'),
            slug: $request->input('slug'),
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteSubCategory(Request $request, DeleteSubCategoryCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
}
