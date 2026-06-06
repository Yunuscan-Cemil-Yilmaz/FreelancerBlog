<?php

namespace App\Business\Features\Blogs\Queries\GetBlogListForModeratorQuery;

use App\Models\Blog;

class GetBlogListForModeratorQuery
{
    public function handle(GetBlogListForModeratorRequest $request): array
    {
        $blogs = Blog::with(['category', 'subCategory'])->orderBy('created_at', 'desc')->paginate($request->perPage);
        
        return [
            'data' => $blogs->items(),
            'total' => $blogs->total(),
            'current_page' => $blogs->currentPage(),
            'per_page' => $blogs->perPage()
        ];
    }
}
