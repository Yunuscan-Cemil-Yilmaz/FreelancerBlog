<?php

namespace App\Business\Features\Blogs\Commands\IncrementBlogViewCountCommand;

use App\Models\Blog;
use Illuminate\Support\Facades\Cache;

class IncrementBlogViewCountCommand
{
    public function handle(IncrementBlogViewCountRequest $request): array
    {
        $blog = Blog::findOrFail($request->id);
        
        $cacheKey = 'blog_view_' . $request->id . '_' . md5($request->ip . $request->userAgent);
        
        if (!Cache::has($cacheKey)) {
            $blog->increment('view_count');
            Cache::put($cacheKey, true, now()->addMinutes(15));
        }

        return ['viewCount' => $blog->view_count];
    }
}
