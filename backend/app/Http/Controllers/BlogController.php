<?php

namespace App\Http\Controllers;

use App\Business\Features\Blogs\Queries\GetBlogBySlugQuery\GetBlogBySlugQuery;
use App\Business\Features\Blogs\Queries\GetBlogBySlugQuery\GetBlogBySlugRequest;
use App\Business\Features\Blogs\Queries\GetBlogListWithPaginationQuery\GetBlogListWithPaginationQuery;
use App\Business\Features\Blogs\Queries\GetBlogListWithPaginationQuery\GetBlogListWithPaginationRequest;
use App\Business\Features\Blogs\Queries\GetBlogListWithPaginationQuery\GetBlogListWithPaginationValidator;
use App\Business\Features\Blogs\Commands\IncrementBlogViewCountCommand\IncrementBlogViewCountCommand;
use App\Business\Features\Blogs\Commands\IncrementBlogViewCountCommand\IncrementBlogViewCountRequest;
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

    public function indexForModerator(Request $request): JsonResponse
    {
        $perPage = $request->integer('per_page', 10);
        $blogs = \App\Models\Blog::with(['category', 'subCategory'])->orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json([
            'data' => $blogs->items(),
            'total' => $blogs->total(),
            'current_page' => $blogs->currentPage(),
            'per_page' => $blogs->perPage()
        ]);
    }

    public function getDetailsForModerator(int $id): JsonResponse
    {
        $blog = \App\Models\Blog::find($id);
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
        return response()->json(['data' => $blog]);
    }

    public function createBlog(Request $request, \App\Business\Features\Blogs\Commands\CreateBlogCommand\CreateBlogCommand $command, \App\Business\Features\Blogs\Commands\CreateBlogCommand\CreateBlogCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        if (isset($data['tags']) && is_string($data['tags'])) {
            $data['tags'] = json_decode($data['tags'], true);
        }
        
        $validator->validate($data);

        $createRequest = new \App\Business\Features\Blogs\Commands\CreateBlogCommand\CreateBlogCommandRequest(
            title_en: $request->input('title_en'),
            title_tr: $request->input('title_tr'),
            slug_en: $request->input('slug_en'),
            slug_tr: $request->input('slug_tr'),
            content_en: $request->input('content_en'),
            content_tr: $request->input('content_tr'),
            excerpt_en: $request->input('excerpt_en'),
            excerpt_tr: $request->input('excerpt_tr'),
            main_image: $request->file('main_image'),
            gallery_images: $request->file('gallery_images'),
            author: $request->input('author'),
            read_time: (int) $request->input('read_time'),
            tags: $data['tags'] ?? null,
            category_id: (int) $request->input('category_id'),
            sub_category_id: $request->input('sub_category_id') ? (int) $request->input('sub_category_id') : null
        );

        return response()->json($command->handle($createRequest));
    }

    public function updateBlog(Request $request, \App\Business\Features\Blogs\Commands\UpdateBlogCommand\UpdateBlogCommand $command, \App\Business\Features\Blogs\Commands\UpdateBlogCommand\UpdateBlogCommandValidator $validator): JsonResponse
    {
        $data = $request->all();
        if (isset($data['tags']) && is_string($data['tags'])) {
            $data['tags'] = json_decode($data['tags'], true);
        }
        if (isset($data['existing_gallery_images']) && is_string($data['existing_gallery_images'])) {
            $data['existing_gallery_images'] = json_decode($data['existing_gallery_images'], true);
        }
        if (isset($data['delete_main_image'])) {
            $data['delete_main_image'] = filter_var($data['delete_main_image'], FILTER_VALIDATE_BOOLEAN);
        }

        $validator->validate($data);

        $updateRequest = new \App\Business\Features\Blogs\Commands\UpdateBlogCommand\UpdateBlogCommandRequest(
            id: (int) $request->input('id'),
            title_en: $request->input('title_en'),
            title_tr: $request->input('title_tr'),
            slug_en: $request->input('slug_en'),
            slug_tr: $request->input('slug_tr'),
            content_en: $request->input('content_en'),
            content_tr: $request->input('content_tr'),
            excerpt_en: $request->input('excerpt_en'),
            excerpt_tr: $request->input('excerpt_tr'),
            main_image: $request->file('main_image'),
            delete_main_image: $data['delete_main_image'] ?? false,
            gallery_images: $request->file('gallery_images'),
            existing_gallery_images: $data['existing_gallery_images'] ?? [],
            author: $request->input('author'),
            read_time: (int) $request->input('read_time'),
            tags: $data['tags'] ?? null,
            category_id: (int) $request->input('category_id'),
            sub_category_id: $request->input('sub_category_id') ? (int) $request->input('sub_category_id') : null
        );

        return response()->json($command->handle($updateRequest));
    }

    public function deleteBlog(Request $request, \App\Business\Features\Blogs\Commands\DeleteBlogCommand\DeleteBlogCommand $command): JsonResponse
    {
        $id = (int) $request->header('id');
        return response()->json($command->handle($id));
    }
}
