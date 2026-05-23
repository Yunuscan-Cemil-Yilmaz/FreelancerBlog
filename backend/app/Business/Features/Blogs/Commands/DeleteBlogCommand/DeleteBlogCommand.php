<?php

namespace App\Business\Features\Blogs\Commands\DeleteBlogCommand;

use App\Models\Blog;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DeleteBlogCommand
{
    public function handle(int $id): array
    {
        $blog = Blog::find($id);

        if (!$blog) {
            throw new HttpException(404, "Blog not found");
        }

        $blog->delete();

        return [
            'message' => 'Blog deleted successfully'
        ];
    }
}
