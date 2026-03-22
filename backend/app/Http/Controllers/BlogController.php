<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request, string $lang): JsonResponse
    {
        $titleField = "title_{$lang}";
        $slugField = "slug_{$lang}";
        $contentField = "content_{$lang}";
        $excerptField = "excerpt_{$lang}";

        $query = Blog::with(['category', 'subCategory']);

        // Optional category filter
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }
        if ($request->has('sub_category_id')) {
            $query->where('sub_category_id', $request->input('sub_category_id'));
        }

        // Sorting
        $sort = $request->input('sort', 'newest');
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            default: // newest
                $query->orderBy('created_at', 'desc');
                break;
        }

        $perPage = $request->input('per_page', 12);
        $paginated = $query->paginate($perPage);

        $categoryNameField = "name_{$lang}";

        $items = $paginated->getCollection()->map(function (Blog $blog) use (
            $titleField, $slugField, $contentField, $excerptField, $categoryNameField
        ) {
            return [
                'id' => $blog->id,
                'title' => $blog->{$titleField},
                'slug' => $blog->{$slugField},
                'content' => $blog->{$contentField},
                'excerpt' => $blog->{$excerptField},
                'imageUrl' => $blog->image_url,
                'images' => $blog->images ?? [],
                'author' => $blog->author,
                'readTime' => $blog->read_time,
                'tags' => $blog->tags ?? [],
                'viewCount' => $blog->view_count,
                'category' => $blog->category ? $blog->category->{$categoryNameField} : null,
                'subCategory' => $blog->subCategory ? $blog->subCategory->{$categoryNameField} : null,
                'createdAt' => $blog->created_at?->toDateString(),
            ];
        });

        return response()->json([
            'data' => $items,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $lang, string $slug): JsonResponse
    {
        $slugField = "slug_{$lang}";
        $titleField = "title_{$lang}";
        $contentField = "content_{$lang}";
        $excerptField = "excerpt_{$lang}";
        $categoryNameField = "name_{$lang}";

        $blog = Blog::with(['category', 'subCategory'])
            ->where($slugField, $slug)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'id' => $blog->id,
                'title' => $blog->{$titleField},
                'slug' => $blog->{$slugField},
                'content' => $blog->{$contentField},
                'excerpt' => $blog->{$excerptField},
                'imageUrl' => $blog->image_url,
                'images' => $blog->images ?? [],
                'author' => $blog->author,
                'readTime' => $blog->read_time,
                'tags' => $blog->tags ?? [],
                'viewCount' => $blog->view_count,
                'category' => $blog->category ? $blog->category->{$categoryNameField} : null,
                'subCategory' => $blog->subCategory ? $blog->subCategory->{$categoryNameField} : null,
                'createdAt' => $blog->created_at?->toDateString(),
            ],
        ]);
    }

    public function incrementViewCount(int $id): JsonResponse
    {
        $blog = Blog::findOrFail($id);
        $blog->increment('view_count');

        return response()->json(['viewCount' => $blog->view_count]);
    }
}
