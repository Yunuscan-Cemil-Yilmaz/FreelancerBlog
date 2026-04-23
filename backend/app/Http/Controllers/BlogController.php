<?php

namespace App\Http\Controllers;

use App\Business\Features\Blogs\GetBlogBySlugQuery\GetBlogBySlugQuery;
use App\Business\Features\Blogs\GetBlogBySlugQuery\GetBlogBySlugRequest;
use App\Business\Features\Blogs\GetBlogListWithPaginationQuery\GetBlogListWithPaginationQuery;
use App\Business\Features\Blogs\GetBlogListWithPaginationQuery\GetBlogListWithPaginationRequest;
use App\Business\Features\Blogs\GetBlogListWithPaginationQuery\GetBlogListWithPaginationValidator;
use App\Business\Features\Blogs\IncrementBlogViewCountCommand\IncrementBlogViewCountCommand;
use App\Business\Features\Blogs\IncrementBlogViewCountCommand\IncrementBlogViewCountRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(
        Request $request,
        string $lang,
        GetBlogListWithPaginationValidator $validator,
        GetBlogListWithPaginationQuery $query
    ): JsonResponse {
        $data = $request->all();
        $data['lang'] = $lang;
        
        $validator->validate($data);

        $blogRequest = new GetBlogListWithPaginationRequest(
            lang: $lang,
            categoryId: $request->integer('category_id') ?: null,
            subCategoryId: $request->integer('sub_category_id') ?: null,
            sort: $request->input('sort', 'newest'),
            perPage: $request->integer('per_page', 12),
            page: $request->integer('page', 1)
        );

        $response = $query->handle($blogRequest);

        return response()->json([
            'data' => $response->items,
            'meta' => $response->meta,
        ]);
    }

    public function show(string $lang, string $slug, GetBlogBySlugQuery $query): JsonResponse
    {
        $blogRequest = new GetBlogBySlugRequest($lang, $slug);
        $response = $query->handle($blogRequest);

        return response()->json([
            'data' => $response->data,
        ]);
    }

    public function incrementViewCount(int $id, IncrementBlogViewCountCommand $command): JsonResponse
    {
        $viewRequest = new IncrementBlogViewCountRequest($id);
        $result = $command->handle($viewRequest);

        return response()->json($result);
    }
}
