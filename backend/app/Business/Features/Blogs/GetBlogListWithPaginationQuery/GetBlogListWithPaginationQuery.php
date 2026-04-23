<?php

namespace App\Business\Features\Blogs\GetBlogListWithPaginationQuery;

use App\Models\Blog;

class GetBlogListWithPaginationQuery
{
    public function handle(GetBlogListWithPaginationRequest $request): GetBlogListWithPaginationResponse
    {
        $lang = $request->lang;
        $titleField = "title_{$lang}";
        $slugField = "slug_{$lang}";
        $contentField = "content_{$lang}";
        $excerptField = "excerpt_{$lang}";
        $categoryNameField = "name_{$lang}";

        $query = Blog::with(['category', 'subCategory']);

        if ($request->categoryId) {
            $query->where('category_id', $request->categoryId);
        }
        if ($request->subCategoryId) {
            $query->where('sub_category_id', $request->subCategoryId);
        }

        switch ($request->sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $paginated = $query->paginate($request->perPage, ['*'], 'page', $request->page);

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
        })->toArray();

        return new GetBlogListWithPaginationResponse(
            $items,
            [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ]
        );
    }
}
