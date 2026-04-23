<?php

namespace App\Business\Features\Blogs\GetBlogBySlugQuery;

use App\Models\Blog;

class GetBlogBySlugQuery
{
    public function handle(GetBlogBySlugRequest $request): GetBlogBySlugResponse
    {
        $lang = $request->lang;
        $slugField = "slug_{$lang}";
        $titleField = "title_{$lang}";
        $contentField = "content_{$lang}";
        $excerptField = "excerpt_{$lang}";
        $categoryNameField = "name_{$lang}";

        $blog = Blog::with(['category', 'subCategory'])
            ->where($slugField, $request->slug)
            ->firstOrFail();

        return new GetBlogBySlugResponse([
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
        ]);
    }
}
