<?php

namespace App\Business\Features\Blogs\Queries\GetBlogDetailsForModeratorQuery;

use App\Models\Blog;
use Symfony\Component\HttpKernel\Exception\HttpException;

class GetBlogDetailsForModeratorQuery
{
    public function handle(int $id): array
    {
        $blog = Blog::find($id);
        if (!$blog) {
            throw new HttpException(404, 'Blog not found');
        }
        
        return ['data' => $blog];
    }
}
