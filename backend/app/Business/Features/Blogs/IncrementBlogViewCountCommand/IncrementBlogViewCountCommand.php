<?php

namespace App\Business\Features\Blogs\IncrementBlogViewCountCommand;

use App\Models\Blog;

class IncrementBlogViewCountCommand
{
    public function handle(IncrementBlogViewCountRequest $request): array
    {
        $blog = Blog::findOrFail($request->id);
        $blog->increment('view_count');

        return ['viewCount' => $blog->view_count];
    }
}
